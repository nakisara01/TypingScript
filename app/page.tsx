"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LandingInput from "./components/LandingInput";

const greetingPhrase = "Hello typingScript";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (next: string) => {
    setValue(next);
    if (next === greetingPhrase) {
      router.push("/language");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-4 py-20 sm:px-6 lg:px-8">
      <section className="glass-panel mx-auto flex w-full max-w-4xl flex-col items-center gap-8 p-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="typingScript logo" width={180} height={60} priority />
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-indigo-500">
            Type to begin
          </p>
        </div>

        <div className="w-full max-w-xl">
          <LandingInput
            ref={inputRef}
            label="Hello typingScript를 입력하세요"
            value={value}
            placeholder={greetingPhrase}
            ghostText={greetingPhrase}
            onChange={handleChange}
          />
          <p className="mt-3 text-base text-zinc-600">
            문장을 정확히 입력하면 언어 선택 화면으로 이동합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
