"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
};

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    card: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const updateWishlist = (updatedList: Product[]) => {
    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
  };

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((item) => item.id !== id);
    updateWishlist(updated);
  };

  const increaseQuantity = (id: number) => {
    const updated = wishlist.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateWishlist(updated);
  };

  const decreaseQuantity = (id: number) => {
    const updated = wishlist.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateWishlist(updated);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = wishlist.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      items: wishlist,
      total: totalAmount,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Payment Successful! 🎉 Order saved to dashboard.");
        localStorage.removeItem("wishlist");
        setWishlist([]);
        setFormData({
          name: "",
          email: "",
          address: "",
          card: "",
          phone: "",
          city: "",
        });
      } else {
        alert("Failed to save order.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong!");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-purple-950 text-center flex items-center justify-center text-white text-xl">
        Wishlist is empty.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-purple-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-300">
            My Wishlist 💖
          </h1>

          {/* Product List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 rounded-xl p-5 shadow-md border border-blue-900"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4 bg-white rounded"
                />
                <h2 className="font-semibold text-lg text-blue-200 mb-1">
                  {product.title}
                </h2>
                <p className="text-purple-400 font-bold mb-3">
                  ${product.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-500"
                  >
                    −
                  </button>
                  <span className="font-semibold">{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-500"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Payment Form */}
          <div className="bg-gray-900 p-8 rounded-xl border border-purple-800">
            <h2 className="text-2xl font-semibold mb-4 text-purple-300">
              Payment & Shipping Details
            </h2>
            <p className="mb-6 text-blue-200">
              Total Amount:{" "}
              <span className="text-green-400 font-bold">
                ${totalAmount.toFixed(2)}
              </span>
            </p>

            <form
              onSubmit={handlePayment}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-black text-white border border-blue-800 p-3 rounded placeholder:text-blue-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-black text-white border border-blue-800 p-3 rounded placeholder:text-blue-400"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-black text-white border border-blue-800 p-3 rounded placeholder:text-blue-400"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="bg-black text-white border border-blue-800 p-3 rounded placeholder:text-blue-400"
                required
              />
              <textarea
                name="address"
                placeholder="Full Shipping Address"
                value={formData.address}
                onChange={handleInputChange}
                className="bg-black text-white border border-blue-800 p-3 rounded col-span-2 placeholder:text-blue-400"
                rows={3}
                required
              />
              <input
                type="text"
                name="card"
                placeholder="Card Number or Payment Ref"
                value={formData.card}
                onChange={handleInputChange}
                className="bg-black text-white border border-blue-800 p-3 rounded col-span-2 placeholder:text-blue-400"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-800 text-white py-3 rounded col-span-2 hover:brightness-110 transition"
              >
                Pay & Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
