"use client";

type Product = {
  id: number;
  image: string;
  title: string;
};

type Props = {
  products?: Product[];
};

export default function CollageGrid({ products = [] }: Props) {
  const topProducts = products.slice(0, 5);
  const remainingProducts = products.slice(5);

  return (
    <section className="py-14 bg-gradient-to-br from-black via-blue-950 to-purple-950">
      <h2 className="text-4xl font-bold text-center text-purple-300 mb-10 tracking-wide">
        ✨ Product Collage ✨
      </h2>

      {/* Top Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-6 max-w-7xl mx-auto mb-12">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl bg-blue-900 shadow-md hover:shadow-purple-700 transition duration-300 group"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-44 object-contain p-4 bg-black group-hover:scale-110 transition-transform duration-300 ease-in-out"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Bottom Centered Products */}
      {remainingProducts.length > 0 && (
        <div className="flex justify-center flex-wrap gap-6 px-4">
          {remainingProducts.map((product) => (
            <div
              key={product.id}
              className="w-40 sm:w-48 bg-blue-900 rounded-xl shadow-lg hover:shadow-purple-700 transition-all p-3 flex flex-col items-center group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-32 object-contain bg-black rounded group-hover:scale-105 transition-transform duration-300"
              />
              <p className="mt-2 text-sm text-center text-blue-200 font-medium">
                {product.title.slice(0, 20)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
