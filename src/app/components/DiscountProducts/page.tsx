"use client";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  discountPrice: number;
};

type Props = {
  products: Product[];
};

export default function DiscountProducts({ products }: Props) {
  return (
    <section className="py-12 bg-gray-50 ">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
        Discounted Products
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4 transition-transform duration-300 hover:scale-105 
              before:absolute before:inset-0 before:rounded-xl before:-z-10 
              before:blur-xl before:opacity-60 before:transition 
              before:duration-500 hover:before:opacity-100 
              before:bg-pink-400"
      >
        {products.map(({ id, title, price, discountPrice, image }) => (
          <Link
            href={`/products/${id}`}
            key={id}
            className="bg-white rounded-lg p-5 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={image}
              alt={title}
              className="h-40 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
              {title}
            </h3>
            <p className="text-red-500 line-through font-semibold">
              ${price.toFixed(2)}
            </p>
            <p className="text-green-600 font-bold text-xl">
              ${discountPrice.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
