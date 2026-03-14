type CompletionNoticeProps = {
  visible: boolean;
};

export default function CompletionNotice({ visible }: CompletionNoticeProps) {
  if (!visible) {
    return (
      <p className="text-sm text-zinc-600">
        Keep typing to match every character in the lesson.
      </p>
    );
  }

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
      Lesson complete! Great job typing the full snippet.
    </div>
  );
}
