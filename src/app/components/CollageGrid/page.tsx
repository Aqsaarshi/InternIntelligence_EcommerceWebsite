"use client";

type Product = {
  id: number;
  image: string;
  title: string;
};

type Props = {
  products: Product[];
};

export default function CollageGrid({ products }: Props) {
  const topProducts = products.slice(0, 5); // top 5
  const remainingProducts = products.slice(5); // rest

  return (
    <section className="py-14 bg-gradient-to-br from-pink-50 to-purple-50 ">
      <h2 className="text-4xl font-bold text-center text-pink-700 mb-10 tracking-wide">
        ✨ Product Collage ✨
      </h2>

      {/* Top Grid (5 items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-6 max-w-7xl mx-auto mb-12 ">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300 bg-white group"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-44 object-contain p-4 group-hover:scale-110 transition-transform duration-300 ease-in-out"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Bottom Centered Products (styled) */}
      {remainingProducts.length > 0 && (
        <div className="flex justify-center flex-wrap gap-6 px-4">
          {remainingProducts.map((product) => (
            <div
              key={product.id}
              className="w-40 sm:w-48 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-3 flex flex-col items-center group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-32 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-2 text-sm text-center text-gray-700 font-medium">
                {product.title.slice(0, 20)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
