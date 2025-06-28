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

  const correctPassword = "admin123"; // Tum apna password yaha change kar sakti ho

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            🔐 Admin Login
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          />
          <button className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:opacity-90 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-600 text-xl">
        No orders found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          📦 Orders Dashboard
        </h1>

        <div className="grid gap-8">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 bg-white p-6"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {order.name}
                </h2>
                <p className="text-sm text-gray-500">{order.email}</p>
                <p className="text-sm text-gray-500">{order.address}</p>
                <p className="text-xs text-gray-400 mt-1">
                  📅 {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 mb-4 border-t pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right">
                <span className="text-lg font-bold text-green-600">
                  Total: ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
