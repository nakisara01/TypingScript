'use client';

import { useCallback } from "react";

type ResultPreviewProps = {
  visible: boolean;
  html: string;
  placeholder: string;
};

export default function ResultPreview({
  visible,
  html,
  placeholder,
}: ResultPreviewProps) {
  const handleOpenNewTab = useCallback(() => {
    if (!visible) return;
    const newWindow = window.open("", "_blank");
    if (!newWindow) return;
    newWindow.document.write(html);
    newWindow.document.close();
  }, [html, visible]);

  return (
    <div className="glass-soft space-y-3 p-6 text-zinc-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
        Result Preview
      </h2>
      <div className="min-h-[8rem] rounded-2xl border border-zinc-200 bg-white p-6">
        {visible ? (
          <div
            className="space-y-2 text-zinc-900"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="text-sm text-zinc-500">{placeholder}</p>
        )}
      </div>
      {visible && (
        <button
          type="button"
          onClick={handleOpenNewTab}
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          새 탭에서 열기
          <span aria-hidden className="text-base">↗</span>
        </button>
      )}
      <p className="text-xs text-zinc-500">
        이 미리보기는 레슨 코드가 그대로 렌더링됩니다. 신뢰할 수 있는 코드만 입력하세요.
      </p>
    </div>
  );
}
