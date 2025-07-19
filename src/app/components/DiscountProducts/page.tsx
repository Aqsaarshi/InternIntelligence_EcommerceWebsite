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
  products?: Product[]; // optional
};

export default function DiscountProducts({ products = [] }: Props) {
  return (
    <section className="py-12 bg-gradient-to-r from-black via-blue-950 to-purple-950">
      <h2 className="text-3xl font-bold text-center text-purple-300 mb-10">
        Discounted Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {products.map(({ id, title, price, discountPrice, image }) => (
          <Link
            href={`/products/${id}`}
            key={id}
            className="bg-blue-900 rounded-lg p-5 shadow-md hover:shadow-purple-700 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <img
              src={image}
              alt={title}
              className="h-40 object-contain mb-4 bg-black rounded"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mb-2 text-blue-200 text-center">
              {title}
            </h3>
            <p className="text-red-400 line-through font-semibold">
              ${price.toFixed(2)}
            </p>
            <p className="text-green-400 font-bold text-xl">
              ${discountPrice.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
