type CodeDisplayProps = {
  code: string;
};

export default function CodeDisplay({ code }: CodeDisplayProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-950 p-4 text-sm text-green-300">
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
