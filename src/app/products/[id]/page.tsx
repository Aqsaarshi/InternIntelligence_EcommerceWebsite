"use client";

import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
  quantity?: number;
};

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        if (!res.ok) return notFound();
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        notFound();
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;

    let existingWishlist: Product[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const productIndex = existingWishlist.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      existingWishlist[productIndex].quantity =
        (existingWishlist[productIndex].quantity || 1) + 1;
    } else {
      existingWishlist.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    router.push("/wishlist");
  };

  if (!product) {
    return <div className="text-center text-gray-600 mt-20">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="flex-1 max-w-md p-6 border rounded-lg shadow-sm bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">
              {product.title}
            </h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <p className="text-3xl font-bold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="inline-block px-4 py-1 text-sm font-semibold text-indigo-800 bg-indigo-100 rounded-full mb-8">
              {product.category.toUpperCase()}
            </p>
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
