"use client";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
        {/* Brand Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="text-3xl font-extrabold tracking-widest select-none cursor-default">
            Aqsora<span className="text-pink-500">.</span>
          </div>
          <p className="mt-2 text-pink-600 font-light italic text-sm max-w-xs">
            Where every detail speaks elegance
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 text-base sm:text-lg font-semibold">
          {["Home", "Shop", "Contact", "Help"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative group text-gray-700 hover:text-pink-600 transition-colors"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded"></span>
            </a>
          ))}
        </nav>

        {/* Newsletter */}
        <div className="w-full max-w-sm flex flex-col items-center lg:items-end">
          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full gap-3"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow rounded px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="bg-pink-400 text-white rounded px-5 py-2 font-semibold hover:bg-pink-500 transition"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <p className="text-pink-600 italic font-semibold mt-2">
              Thanks for subscribing!
            </p>
          )}
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center gap-8 text-2xl text-pink-400">
        {[
          {
            href: "https://facebook.com",
            label: "Facebook",
            svgPath:
              "M22 12a10 10 0 10-11.5 9.8v-6.9h-2v-2.9h2v-2.2c0-2 1.2-3.2 3-3.2.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2v1.7h2.3l-.4 2.9h-1.9v6.9A10 10 0 0022 12z",
          },
          {
            href: "https://twitter.com",
            label: "Twitter",
            svgPath:
              "M8 19c7 0 10.8-5.8 10.8-10.8 0-.2 0-.3 0-.5A7.7 7.7 0 0020 6.3a7.6 7.6 0 01-2.2.6 3.8 3.8 0 001.7-2.1 7.6 7.6 0 01-2.4.9 3.8 3.8 0 00-6.5 3.5 10.8 10.8 0 01-7.9-4 3.8 3.8 0 001.2 5.1 3.7 3.7 0 01-1.7-.5v.1a3.8 3.8 0 003 3.7 3.8 3.8 0 01-1.7.1 3.8 3.8 0 003.5 2.6A7.7 7.7 0 018 19z",
          },
          {
            href: "https://instagram.com",
            label: "Instagram",
            svgPath:
              "M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2a2 2 0 110 4 2 2 0 010-4zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z",
          },
        ].map(({ href, label, svgPath }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="relative group rounded-full p-2 hover:bg-pink-300 hover:text-white transition-shadow shadow-md"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path d={svgPath} />
            </svg>
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 rounded bg-pink-400 px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none">
              {label}
            </span>
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="mt-10 text-center text-pink-600 text-sm select-none">
        &copy; {new Date().getFullYear()} Aqsora. All rights reserved.
      </p>
    </footer>
  );
}
