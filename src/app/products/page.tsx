"use client";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  imageURL?: string;
  description: string;
  price: number;
  slug: string;
  discountPercentage?: number;
  isNew?: boolean;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await client.fetch(
          groq `*[_type == "product"]{
            _id,
            title,
            "imageURL": productImage.asset->url,
            description,
            price,
            "slug": slug.current,
            discountPercentage,
            isNew
          }`
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-green-400 text-2xl font-bold mt-10">Loading Products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-red-500 text-2xl font-bold mt-10">No Products Available</div>;
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-center text-4xl font-bold text-green-400 mb-8">Latest Products</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <div key={product._id} className="w-64 bg-gray-800 p-5 rounded-lg shadow-md text-center">
            {product.imageURL ? (
              <Image
                src={product.imageURL}
                width={200}
                height={200}
                alt={product.title}
                className="rounded-lg mx-auto"
              />
            ) : (
              <div className="h-48 bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <h2 className="text-xl font-bold mt-3">{product.title}</h2>
            <p className="text-green-400 text-lg font-semibold">Price: ${product.price}</p>
            {product.discountPercentage && (
              <p className="text-red-400 text-sm">Discount: {product.discountPercentage}%</p>
            )}
            {product.isNew && <span className="text-xs bg-green-600 px-3 py-1 rounded-full text-white">New</span>}
            <Link
              href={`/products/${product.slug}`}
              className="block mt-4 bg-green-500 py-2 text-white rounded-lg hover:bg-green-600 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPage