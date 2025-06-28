"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import Link from "next/link";
import DiscountProducts from "../components/DiscountProducts/page";
import CollageGrid from "../components/CollageGrid/page";
import AnimatedImage from "../components/AnimatedImage/page";
import CommentsComponent from "../components/Comments/page";
import Footer from "../components/Footer/page";
// @ts-ignore
import TypeWriterEffect from "react-typewriter-effect";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <Navbar />

      <main className="flex items-center justify-center min-h-[60vh] bg-gradient-to-r from-indigo-50 to-pink-100 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to MyShop 🛒
          </h1>
          <div className="text-lg text-gray-600">
            <TypeWriterEffect
              textStyle={{ fontSize: "1.125rem", color: "#4B5563" }}
              startDelay={100}
              cursorColor="#4B5563"
              text="Explore our exclusive collection of stylish products!"
              typeSpeed={50}
            />
          </div>
        </div>
      </main>

      <section className="py-12 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8 text-indigo-700">
          Featured Products
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-indigo-50 p-4 rounded-xl shadow transition cursor-pointer hover:bg-gradient-to-br hover:from-pink-200 hover:to-pink-400 hover:shadow-pink-300 hover:shadow-lg duration-300">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-md mb-3 h-40 object-contain mx-auto"
                  />
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </p>
                  <p className="mt-2 font-bold text-indigo-600">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
        <DiscountProducts
          products={products
            .filter((p) => p.price > 50) // example discount filter
            .map((p) => ({
              ...p,
              discountPrice: p.price * 0.8,
            }))}
        />
        {products.length > 0 && <CollageGrid products={products} />}
        <AnimatedImage
          src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
          alt="Luxury Jewellery"
        />
        <CommentsComponent className="bg-black" /> <Footer />
      </section>
    </div>
  );
}
