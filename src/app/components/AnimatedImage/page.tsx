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
      relative flex flex-col justify-center items-center px-6 sm:px-12 py-10 sm:py-16 rounded-3xl
      max-w-xl mx-auto overflow-hidden
      bg-gradient-to-tr from-black via-blue-950 to-purple-950
      shadow-lg
      before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,_rgba(75,0,130,0.2),_transparent_60%)]
      before:pointer-events-none before:rounded-3xl
      after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_bottom_right,_rgba(123,104,238,0.2),_transparent_70%)]
      after:pointer-events-none after:rounded-3xl
    "
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-400 transition-all duration-500 animate-[pulseGlow_2.5s_ease-in-out_infinite] z-0" />

      {/* Animated product image */}
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

      {/* Tagline */}
      <h2
        className={`relative z-20 mt-6 text-2xl sm:text-3xl font-serif text-purple-300 opacity-0 transform translate-y-4 transition-all duration-[1500ms] ease-out ${
          inView ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {tagline}
      </h2>

      {/* Discount Text */}
      <p
        className={`relative z-20 mt-2 text-sm sm:text-base text-blue-300 font-medium opacity-0 transform translate-y-6 transition-all duration-[2000ms] ease-out delay-300 ${
          inView ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {discountText}
      </p>
    </div>
  );
}
