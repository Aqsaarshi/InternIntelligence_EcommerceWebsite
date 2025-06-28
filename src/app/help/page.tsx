"use client";

import Footer from "../components/Footer/page";
import Navbar from "../components/Navbar/page";

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 mt-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-indigo-800 text-center mb-10">
          Need Help? We're Here for You!
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              💬 Frequently Asked Questions
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>How can I track my order?</strong> — You'll receive an
                email with tracking details once your order is shipped.
              </li>
              <li>
                <strong>Can I cancel or update my order?</strong> — Yes, within
                24 hours of placing the order.
              </li>
              <li>
                <strong>What if I receive a damaged item?</strong> — Contact us
                immediately and we'll replace it free of charge.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              📞 Contact Support
            </h2>
            <p className="text-gray-700 mb-2">
              Still need help? You can reach our support team directly:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:support@comforty.com"
                  className="text-indigo-600 underline hover:text-pink-500"
                >
                  support@aqsaora.com
                </a>
              </li>
              <li>📱 Phone: +92 300 1234567</li>
              <li>🕒 Support Hours: Mon-Sat, 9 AM - 6 PM</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
