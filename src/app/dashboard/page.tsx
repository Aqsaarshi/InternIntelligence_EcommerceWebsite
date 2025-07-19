"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  name: string;
  email: string;
  address: string;
  card: string;
  items: Product[];
  total: number;
  date: string;
};

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const correctPassword = "admin123"; // Change this if needed

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const res = await fetch("/api/wishlist");
          const data = await res.json();
          setOrders(data.orders || []);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch orders", error);
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-950 to-purple-950 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 text-white p-8 rounded-xl shadow-lg max-w-md w-full border border-blue-800"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">
            🔐 Admin Login
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-purple-800 p-3 rounded mb-6 text-white placeholder:text-blue-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button className="w-full bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white font-semibold py-2 rounded-md hover:brightness-110 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-black via-blue-950 to-purple-950">
        Loading orders...
      </div>
    );

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-300 bg-gradient-to-br from-black via-blue-950 to-purple-950 text-xl">
        No orders found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-purple-950 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-300 mb-10 text-center">
            📦 Orders Dashboard
          </h1>

          <div className="grid gap-8">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-purple-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-purple-300">
                    {order.name}
                  </h2>
                  <p className="text-sm text-blue-300">{order.email}</p>
                  <p className="text-sm text-blue-300">{order.address}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    📅 {new Date(order.date).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4 mb-4 border-t border-blue-800 pt-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded-md border border-blue-800 bg-white"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-blue-200">
                          {item.title}
                        </p>
                        <p className="text-sm text-purple-400">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right">
                  <span className="text-lg font-bold text-green-400">
                    Total: ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
