"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, loginUser, resetPassword } from "./firebaseAuth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

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
      router.push("/home");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset link sent to your email.");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col bg-gradient-to-br from-black via-indigo-950 to-purple-950">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-end p-4 md:p-10">
        <img
          src="/pic1.png"
          alt="Login illustration"
          className="w-[90%] h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-start p-4 md:p-10">
        <div className="w-full max-w-md bg-gradient-to-br from-black via-indigo-950 to-purple-950 p-8 rounded-2xl shadow-2xl border border-purple-700 text-white">
          <h2 className="text-3xl font-extrabold text-center text-purple-300 mb-8 tracking-wide">
            Welcome 👋
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border border-purple-700 rounded-xl bg-black text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-3 border border-purple-700 rounded-xl bg-black text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between text-sm text-purple-300 mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-purple-500"
              />
              Remember Me
            </label>

            <div className="space-x-2">
              <button
                onClick={handleForgotPassword}
                className="hover:underline text-purple-400"
              >
                Forgot Password?
              </button>
              <span>|</span>
              <a href="#" className="hover:underline text-purple-400">
                Sign Up
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRegister}
              className="bg-gradient-to-r from-blue-700 to-purple-700 hover:brightness-110 text-white font-semibold py-2 rounded-xl shadow"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-110 text-white font-semibold py-2 rounded-xl shadow"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
