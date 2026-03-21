'use client';

import { useCallback, useEffect, useMemo, useState } from "react";

type ResultPreviewProps = {
  visible: boolean;
  code: string;
  placeholder: string;
};

type ConsoleLogEntry = {
  id: string;
  level: "log" | "info" | "warn" | "error";
  message: string;
  timestamp: number;
};

export default function ResultPreview({
  visible,
  code,
  placeholder,
}: ResultPreviewProps) {
  const [reloadKey, setReloadKey] = useState(0);
  const [runtimeEvent, setRuntimeEvent] = useState<
    | { type: "runtime" | "console"; message: string }
    | null
  >(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLogEntry[]>([]);

  const srcDoc = useMemo(() => {
    const instrumentation = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
  </head>
  <body>
    <script>
      (function() {
        const sendMessage = function(type, payload) {
          if (!window.parent || !window.parent.postMessage) return;
          window.parent.postMessage({ source: 'typingscript-preview', type: type, payload: payload }, '*');
        };
        sendMessage('preview-init', {});
        var interceptConsole = function(method, messageType) {
          var original = console[method];
          console[method] = function() {
            var args = Array.prototype.slice.call(arguments).map(function(item) {
              if (typeof item === 'string') return item;
              if (item && item.stack) return String(item.stack);
              if (typeof item === 'object') {
                try { return JSON.stringify(item); } catch (err) { return '[object Object]'; }
              }
              return String(item);
            });
            sendMessage(messageType, { message: args.join(' ') });
            if (original) {
              original.apply(console, arguments);
            }
          };
        };
        interceptConsole('log', 'console-log');
        interceptConsole('info', 'console-info');
        interceptConsole('warn', 'console-warn');
        interceptConsole('error', 'console-error');
        window.addEventListener('error', function(event) {
          sendMessage('runtime-error', {
            message: event.message || 'Unknown error',
            line: event.lineno,
            column: event.colno
          });
        });
      })();
    <\/script>
    ${code}
  </body>
</html>`;

    return instrumentation;
  }, [code]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setRuntimeEvent(null);
      setConsoleLogs([]);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [code, reloadKey]);

  useEffect(() => {
    if (visible) {
      return;
    }
    const timer = window.setTimeout(() => {
      setRuntimeEvent(null);
      setConsoleLogs([]);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") {
        return;
      }
      const data = event.data as {
        source?: string;
        type?: string;
        payload?: { message?: string; line?: number; column?: number };
      };
      if (data.source !== "typingscript-preview") {
        return;
      }

      if (data.type === "preview-init") {
        setRuntimeEvent(null);
        setConsoleLogs([]);
        return;
      }

      if (
        data.type === "console-log" ||
        data.type === "console-info" ||
        data.type === "console-warn" ||
        data.type === "console-error"
      ) {
        const level = (data.type.replace("console-", "") ?? "log") as ConsoleLogEntry["level"];
        const message = data.payload?.message ?? "";
        setConsoleLogs((prev) => {
          const next = prev.concat({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            level,
            message,
            timestamp: Date.now(),
          });
          const max = 30;
          return next.length > max ? next.slice(next.length - max) : next;
        });
      }

      if (data.type === "runtime-error" || data.type === "console-error") {
        const label = data.type === "runtime-error" ? "runtime" : "console";
        const { message, line, column } = data.payload ?? {};
        const decorated =
          line && column ? `${message ?? "오류"} (line ${line}, col ${column})` : message ?? "오류가 발생했습니다.";
        setRuntimeEvent({
          type: label,
          message: decorated,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleOpenNewTab = useCallback(() => {
    if (!visible) return;
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;
    newWindow.document.write(code);
    newWindow.document.close();
  }, [code, visible]);

  const handleResetPreview = useCallback(() => {
    if (!visible) return;
    setReloadKey((prev) => prev + 1);
  }, [visible]);

  const handleClearConsole = useCallback(() => {
    setConsoleLogs([]);
  }, []);

  const consoleLabelMap: Record<ConsoleLogEntry["level"], { label: string; className: string }> = {
    log: { label: "Log", className: "border-zinc-200 bg-zinc-50 text-zinc-700" },
    info: { label: "Info", className: "border-sky-200 bg-sky-50 text-sky-800" },
    warn: { label: "Warn", className: "border-amber-200 bg-amber-50 text-amber-800" },
    error: { label: "Error", className: "border-rose-200 bg-rose-50 text-rose-800" },
  };

  return (
    <div className="glass-soft space-y-3 p-6 text-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
        Result Preview
      </h2>
      <div className="min-h-[8rem] rounded-2xl border border-zinc-200 bg-white p-0">
        {visible ? (
          <iframe
            key={reloadKey}
            title="Lesson result preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="h-[18rem] w-full rounded-2xl"
          />
        ) : (
          <div className="p-6">
            <p className="text-sm text-zinc-500">{placeholder}</p>
          </div>
        )}
      </div>
      {visible && (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleOpenNewTab}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 px-4 py-1.5 text-sm font-semibold text-indigo-600 transition hover:border-indigo-300"
          >
            새 탭에서 열기
            <span aria-hidden className="text-base">↗</span>
          </button>
          <button
            type="button"
            onClick={handleResetPreview}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-1.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-300"
          >
            미리보기 새로고침
          </button>
        </div>
      )}
      {visible && (
        <div className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Console 출력
              </p>
              <p className="text-xs text-zinc-500">
                `console.log/info/warn/error` 메시지가 여기 표시됩니다.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearConsole}
              disabled={consoleLogs.length === 0}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              로그 지우기
            </button>
          </div>
          <div className="mt-3 max-h-48 space-y-2 overflow-y-auto text-sm">
            {consoleLogs.length === 0 ? (
              <p className="text-xs text-zinc-500">아직 출력된 로그가 없습니다.</p>
            ) : (
              consoleLogs.map((entry) => {
                const { label, className } = consoleLabelMap[entry.level];
                const time = new Date(entry.timestamp).toLocaleTimeString();
                return (
                  <div
                    key={entry.id}
                    className={`rounded-xl border px-3 py-2 font-mono text-xs ${className}`}
                  >
                    <p className="flex items-center justify-between text-[10px] uppercase tracking-wide">
                      <span>
                        {label} · {time}
                      </span>
                    </p>
                    <p className="mt-1 whitespace-pre-wrap break-words text-[11px]">
                      {entry.message || "(빈 메시지)"}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
      {visible && runtimeEvent && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <p className="font-semibold uppercase tracking-wide text-rose-500">
            {runtimeEvent.type === "console" ? "Console" : "Runtime"} 오류
          </p>
          <p className="mt-1 text-sm text-rose-700">{runtimeEvent.message}</p>
          <p className="pt-2 text-xs text-rose-500">
            오류를 해결한 뒤 미리보기를 새로고침해 주세요.
          </p>
        </div>
      )}
      <p className="text-xs text-zinc-500">
        입력한 코드가 샌드박스된 미리보기에서 그대로 실행됩니다. 신뢰할 수 있는 코드만 입력하세요.
      </p>
    </div>
  );
}
