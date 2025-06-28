"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Router import karo
import { registerUser, loginUser } from "./firebaseAuth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Router initialize karo

  const handleRegister = async () => {
    try {
      const userCredential = await registerUser(email, password);
      alert("User registered: " + userCredential.user.email);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await loginUser(email, password);
      alert("User logged in: " + userCredential.user.email);
      router.push("/home"); // Login success ke baad home page pe redirect karo
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-6">
          Welcome 👋
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleRegister}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
