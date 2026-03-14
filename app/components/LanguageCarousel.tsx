"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { LanguageOption } from "../data/languages";

type LanguageCarouselProps = {
  languages: LanguageOption[];
  onActiveChange?: (language: LanguageOption) => void;
};

export default function LanguageCarousel({
  languages,
  onActiveChange,
}: LanguageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!languages.length) return;
    onActiveChange?.(languages[activeIndex]);
  }, [activeIndex, languages, onActiveChange]);

  return (
    <div className="glass-soft w-full p-6 text-zinc-900">
      <Swiper
        className="landing-swiper w-full"
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        loopAdditionalSlides={languages.length}
        centeredSlides
        speed={800}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {languages.map((language) => (
          <SwiperSlide key={language.id} className="flex justify-center">
            <div className="language-card w-full max-w-xl rounded-2xl border border-zinc-200 bg-white px-6 py-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
                {language.name}
              </p>
              <h3 className="text-xl font-semibold text-zinc-900">
                {language.description}
              </h3>
              {language.sampleCode && (
                <pre className="mt-4 rounded-xl bg-zinc-900 p-3 text-xs text-emerald-100">
                  {language.sampleCode}
                </pre>
              )}
              {language.sampleResult && (
                <p className="mt-2 text-xs text-zinc-500">
                  {language.sampleResult}
                </p>
              )}
              <span
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  language.status === "available"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {language.status === "available" ? "OPEN" : "COMING"}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
