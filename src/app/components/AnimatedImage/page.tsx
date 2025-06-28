"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  tagline?: string;
  discountText?: string;
};

export default function AnimatedImage({
  src,
  alt,
  tagline = "White Gold Plated Princess",
  discountText = "Up to 50% off – Limited Time Offer!",
}: Props) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="
    relative flex flex-col justify-center items-center px-16 py-8 sm:px-24 sm:py-12 rounded-3xl
    max-w-xl mx-auto overflow-hidden
    bg-gradient-to-tr from-pink-100 via-white to-yellow-50
    shadow-lg
    before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,_rgba(255,182,193,0.3),_transparent_60%)]
    before:pointer-events-none before:rounded-3xl
    after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_bottom_right,_rgba(255,240,245,0.3),_transparent_70%)]
    after:pointer-events-none after:rounded-3xl 
  "
    >
      {/* Glowing Border Animation */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-pink-300 transition-all duration-500 animate-[pulseGlow_2.5s_ease-in-out_infinite] z-0" />

      {/* Image with slow reveal */}
      <img
        src={src}
        alt={alt}
        className={`
          relative z-10 w-full rounded-3xl shadow-2xl object-cover
          transition-all duration-[2000ms] ease-in-out
          ${
            inView
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-lg scale-90"
          }
          hover:scale-105
        `}
      />

      {/* Headline animated */}
      <h2
        className={`relative z-20 mt-6 text-2xl sm:text-3xl font-serif text-[#7a2e47] opacity-0 transform translate-y-4 transition-all duration-[1500ms] ease-out ${
          inView ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {tagline}
      </h2>

      {/* Discount/Offer text animated */}
      <p
        className={`relative z-20 mt-2 text-sm sm:text-base text-[#a03a60] font-medium opacity-0 transform translate-y-6 transition-all duration-[2000ms] ease-out delay-300 ${
          inView ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {discountText}
      </p>
    </div>
  );
}
