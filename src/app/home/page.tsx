"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import Link from "next/link";
import DiscountProducts from "../components/DiscountProducts/page";
import CollageGrid from "../components/CollageGrid/page";
import AnimatedImage from "../components/AnimatedImage/page";
import CommentsComponent from "../components/Comments/page";
import Footer from "../components/Footer/page";

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
    <div className="bg-black text-blue-200">
      <Navbar />

      <main className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-black via-blue-950 to-purple-950 text-center px-4 relative overflow-hidden">
        {/* Inline CSS for animation */}
        <style jsx>{`
          @keyframes fadeZoom {
            0% {
              opacity: 0;
              transform: scale(0.8) translateY(20px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          .fade-zoom {
            animation: fadeZoom 2s ease-out forwards;
          }
        `}</style>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10">
          {/* Left Side - Text with animation */}
          <div className="w-full md:w-1/2 text-left fade-zoom">
            <h1 className="text-5xl font-bold text-purple-300 mb-4">
              Welcome to Aqseluxe 🛍️
            </h1>
            <p className="text-lg text-blue-400">
              Explore our exclusive collection of stylish products!
            </p>
          </div>

          {/* Right Side - Image with animation */}
          <div className="w-full md:w-1/2 fade-zoom ">
            <img
              src="/bg.avif"
              alt="Slowmo Image"
              className="mask-x-from-96 h-[400px] object-cover rounded-xl shadow-xl"
            />
          </div>
        </div>
      </main>

      <section className="py-12 bg-gradient-to-b from-black via-blue-950 to-purple-950">
        <h2 className="text-2xl font-bold text-center mb-8 text-purple-300">
          Featured Products
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {products.length === 0 ? (
            <p className="text-center text-blue-400">Loading products...</p>
          ) : (
            products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-blue-950 p-4 rounded-xl shadow transition cursor-pointer hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-500 duration-300">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-md mb-3 h-40 object-contain mx-auto bg-black p-2"
                  />
                  <h3 className="text-lg font-semibold text-purple-200">
                    {product.title}
                  </h3>
                  <p className="text-sm text-blue-400">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </p>
                  <p className="mt-2 font-bold text-blue-300">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        <DiscountProducts
          products={products
            .filter((p) => p.price > 50)
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

        <CommentsComponent className="bg-black" />
        <Footer />
      </section>
    </div>
  );
}
