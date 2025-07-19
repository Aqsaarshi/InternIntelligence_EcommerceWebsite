"use client";

import Footer from "../components/Footer/page";
import Navbar from "../components/Navbar/page";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 mt-20 bg-gradient-to-br from-black via-indigo-950 to-purple-950 rounded-2xl shadow-2xl border border-indigo-900">
        <h1 className="text-4xl font-extrabold text-purple-300 text-center mb-10">
          Need Help? We're Here for You!
        </h1>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-pink-400 mb-3">
              💬 Frequently Asked Questions
            </h2>
            <ul className="list-disc list-inside space-y-3 text-purple-100">
              <li>
                <strong className="text-white">
                  How can I track my order?
                </strong>{" "}
                — You’ll receive an email with tracking details once your order
                is shipped.
              </li>
              <li>
                <strong className="text-white">
                  Can I cancel or update my order?
                </strong>{" "}
                — Yes, within 24 hours of placing the order.
              </li>
              <li>
                <strong className="text-white">
                  What if I receive a damaged item?
                </strong>{" "}
                — Contact us immediately and we’ll replace it free of charge.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-400 mb-3">
              📞 Contact Support
            </h2>
            <p className="text-purple-200 mb-3">
              Still need help? You can reach our support team directly:
            </p>
            <ul className="space-y-2 text-purple-200">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:support@aqsaora.com"
                  className="text-pink-400 underline hover:text-pink-500"
                >
                  support@aqsaora.com
                </a>
              </li>
              <li>📱 Phone: +92 300 1234567</li>
              <li>🕒 Support Hours: Mon–Sat, 9 AM – 6 PM</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
