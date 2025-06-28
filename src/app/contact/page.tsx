"use client";

import { useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For demo, just show success message
    setStatus("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });

    // Yahan API call kar sakte ho form data bhejne ke liye
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 rounded-2xl shadow-xl mt-20 animate-gradient bg-gradient-to-br from-pink-100 via-indigo-50 to-blue-100">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-10 text-center tracking-tight">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-indigo-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Aqsa Arshi"
              className="w-full border border-indigo-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-indigo-700 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="aqsa@example.com"
              className="w-full border border-indigo-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-indigo-700 font-medium mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message here..."
              className="w-full border border-indigo-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white shadow-sm resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-white font-semibold py-3 rounded-xl shadow-md hover:brightness-110 transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-6 text-green-600 font-semibold text-center">
            {status}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
