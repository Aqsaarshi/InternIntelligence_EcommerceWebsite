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
      <div className="text-center mt-20 text-gray-600 text-xl">
        Wishlist is empty.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
              <p className="text-green-600 font-bold mb-2">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center mb-4 space-x-3">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="font-medium">{product.quantity}</span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Payment Form */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <p className="mb-4 text-gray-600">
            Total Amount:{" "}
            <span className="text-green-600 font-bold">
              ${totalAmount.toFixed(2)}
            </span>
          </p>
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-pink-700">
              Payment & Shipping Details
            </h2>
            <p className="mb-4 text-gray-600">
              Total Amount:{" "}
              <span className="text-green-600 font-bold">
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
                className="border p-2 rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city || ""}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />

              <textarea
                name="address"
                placeholder="Full Shipping Address"
                value={formData.address}
                onChange={handleInputChange}
                className="border p-2 rounded col-span-2"
                rows={3}
                required
              />

              <input
                type="text"
                name="card"
                placeholder="Card Number or Payment Ref"
                value={formData.card}
                onChange={handleInputChange}
                className="border p-2 rounded col-span-2"
                required
              />

              <button
                type="submit"
                className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition col-span-2"
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
