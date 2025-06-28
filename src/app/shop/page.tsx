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
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <>
      <Navbar />
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-pink-100">
        <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">
          Featured Products
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-indigo-50 p-4 rounded-xl shadow transition cursor-pointer hover:bg-gradient-to-br hover:from-pink-200 hover:to-pink-400 hover:shadow-pink-300 hover:shadow-lg duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="rounded-md mb-3 h-40 object-contain mx-auto"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600 capitalize">
                  {product.category}
                </p>
                <p className="mt-2 font-bold text-indigo-600">
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
