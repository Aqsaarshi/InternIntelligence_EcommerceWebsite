"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar/page";
import Footer from "../components/Footer/page";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
};

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center text-purple-300 mt-10">Loading products...</p>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gradient-to-r from-black via-indigo-950 to-purple-950 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-300 tracking-wide">
          Explore Our Collection
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-black border border-indigo-900 p-5 rounded-xl shadow-md hover:shadow-purple-700 hover:bg-gradient-to-br hover:from-indigo-900 hover:to-purple-900 transition duration-300 cursor-pointer text-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-md mb-4 h-40 object-contain mx-auto"
                />
                <h3 className="text-lg font-semibold line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-purple-300 capitalize mt-1">
                  {product.category}
                </p>
                <p className="mt-2 font-bold text-purple-400">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Footer />
      </section>
    </>
  );
};

export default ShopPage;
