"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, type User } from "firebase/auth";
import { logoutUser } from "../firebaseAuth";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <nav className="bg-gradient-to-r from-black via-blue-900 to-purple-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-300">🛍️ Aqseluxe</div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-3xl text-blue-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex gap-6 font-medium items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent px-6 md:px-0 py-4 md:py-0 rounded-b-xl shadow-md md:shadow-none z-50`}
        >
          <li>
            <Link
              href="/home"
              className="block md:inline-block text-blue-200 hover:text-purple-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="block md:inline-block text-blue-200 hover:text-purple-400 transition"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block md:inline-block text-blue-200 hover:text-purple-400 transition"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/help"
              className="block md:inline-block text-blue-200 hover:text-purple-400 transition"
            >
              Help
            </Link>
          </li>

          {user ? (
            <li className="relative group cursor-pointer">
              <div className="flex items-center gap-2 py-2 md:py-0">
                <div className="w-8 h-8 bg-purple-700 text-white flex items-center justify-center rounded-full text-sm">
                  {user?.email?.[0]?.toUpperCase()}
                </div>
                <span className="text-sm text-blue-200">{user?.email}</span>
              </div>
              <div className="absolute right-0 mt-2 w-32 bg-gray-900 text-blue-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li>
              <Link
                href="/"
                className="block md:inline-block text-blue-200 hover:text-purple-400 transition"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
