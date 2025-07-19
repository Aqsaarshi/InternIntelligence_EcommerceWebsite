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
    setStatus("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-20 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-black via-indigo-950 to-purple-950">
        <h1 className="text-4xl font-extrabold text-purple-300 mb-10 text-center tracking-tight">
          Get in Touch 💌
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-purple-400 mb-2 font-medium"
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
              className="w-full px-4 py-3 rounded-xl bg-black border border-purple-800 placeholder-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-purple-400 mb-2 font-medium"
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
              className="w-full px-4 py-3 rounded-xl bg-black border border-purple-800 placeholder-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-purple-400 mb-2 font-medium"
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
              className="w-full px-4 py-3 rounded-xl bg-black border border-purple-800 placeholder-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-700 via-blue-800 to-purple-700 hover:brightness-110 transition text-white shadow-md"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-6 text-green-400 text-center font-semibold">
            {status}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
