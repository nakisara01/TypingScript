import { ForwardedRef, forwardRef } from "react";

type LandingInputProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  ghostText?: string;
};

function LandingInputBase(
  {
    label,
    value,
    placeholder,
    onChange,
    disabled = false,
    ghostText,
  }: LandingInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const hintRemainder = ghostText ? ghostText.slice(value.length) : "";

  return (
    <label className="flex w-full flex-col gap-2 text-left">
      <span className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
        {label}
      </span>
      <div className="relative">
        <input
          ref={ref}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={ghostText ? undefined : placeholder}
          disabled={disabled}
          className={`w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-lg font-semibold shadow-sm outline-none transition focus:border-indigo-400 ${ghostText ? "text-transparent caret-indigo-600" : "text-zinc-900"}`}
        />
        {ghostText && (
          <div className="pointer-events-none absolute inset-0 flex items-center px-5 py-4 text-lg font-semibold">
            <span className="text-zinc-900">{value}</span>
            <span className="text-zinc-400">{hintRemainder}</span>
          </div>
        )}
      </div>
    </label>
  );
}

const LandingInput = forwardRef<HTMLInputElement, LandingInputProps>(LandingInputBase);
LandingInput.displayName = "LandingInput";

export default LandingInput;
