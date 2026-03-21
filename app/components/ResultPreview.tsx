'use client';

import { useCallback, useEffect, useMemo, useState } from "react";

type ResultPreviewProps = {
  visible: boolean;
  code: string;
  placeholder: string;
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
        window.addEventListener('error', function(event) {
          sendMessage('runtime-error', {
            message: event.message || 'Unknown error',
            line: event.lineno,
            column: event.colno
          });
        });
        const originalConsoleError = console.error;
        console.error = function() {
          const args = Array.prototype.slice.call(arguments).map(function(item) {
            if (typeof item === 'string') return item;
            try { return JSON.stringify(item); } catch (err) { return '[object Object]'; }
          });
          sendMessage('console-error', { message: args.join(' ') });
          if (originalConsoleError) {
            originalConsoleError.apply(console, arguments);
          }
        };
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
    });
    return () => window.cancelAnimationFrame(frame);
  }, [code, reloadKey]);

  useEffect(() => {
    if (visible) {
      return;
    }
    const timer = window.setTimeout(() => {
      setRuntimeEvent(null);
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
        return;
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
