// "use client";
// import { client } from "@/sanity/lib/client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // Define TypeScript Interface for Products
// interface Product {
//   _id: string;
//   title: string;
//   imageURL?: string;
//   description: string;
//   tags?: string[];
//   discountPercentage?: number;
//   price: number;
//   slug: string;
//   isNew?: boolean;
// }

// const ProductPage = () => {
//   const [storeData, setStoreData] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch data using useEffect
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data: Product[] = await client.fetch(
//           `*[_type== 'product']{
//             _id,
//             title,
//             "imageURL": productImage.asset->url,
//             description,
//             tags,
//             discountPercentage,
//             price,
//             "slug": slug.current,
//             isNew
//           }`
//         );
//         setStoreData(data);  // Update the state with the fetched data
//       } catch (error) {
//         console.error("Error fetching data:", error);  // Handle errors
//       } finally {
//         setLoading(false);  // Set loading to false once data is fetched
//       }
//     };

//     fetchData();  // Call fetchData function
//   }, []);  // Empty dependency array ensures this effect runs once when the component mounts

//   // If loading, display loading state
//   if (loading) {
//     return (
//       <section className="text-center mt-10 text-4xl text-green-400 font-bold animate-pulse">
//         Products are Loading...
//       </section>
//     );
//   }

//   // If no products found, display no products message
//   if (storeData.length === 0) {
//     return (
//       <section className="text-center mt-10 text-4xl text-red-500 font-bold">
//         No Products Available
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-gray-900 text-white py-10">
//       <h1 className="text-center text-5xl font-extrabold text-green-400 mb-10">
//         Latest Products
//       </h1>

//       <div className="flex flex-wrap justify-center gap-6 px-5">
//         {storeData.map((product) => (
//           <div
//             key={product._id}
//             className="w-[250px] bg-gray-800 shadow-lg hover:shadow-2xl p-6 rounded-xl transform transition-all duration-300 hover:scale-105"
//           >
//             {product.imageURL ? (
//               <Image
//                 className="mx-auto bg-gray-700 rounded-lg mb-5"
//                 src={product.imageURL}
//                 width={200}
//                 height={200}
//                 alt={product.title}
//               />
//             ) : (
//               <div className="bg-gray-700 w-full h-48 mb-5 flex items-center justify-center text-gray-400">
//                 No Image Available
//               </div>
//             )}
//             <h1 className="text-lg font-semibold text-white mb-2">
//               {product.title}
//             </h1>
//             <h1 className="font-bold text-xl text-green-400 mb-2">
//               Price: ${product.price}
//             </h1>
//             {product.discountPercentage && (
//               <div className="text-sm text-red-400 mb-2">
//                 Discount: {product.discountPercentage}%
//               </div>
//             )}
//             {product.discountPercentage && (
//               <h1 className="font-semibold text-green-400 mb-2">
//                 Price After Discount: $(
//                 {(
//                   product.price - 
//                   (product.price * product.discountPercentage) / 100
//                 ).toFixed(2)})
//               </h1>
//             )}
//             {product.isNew && (
//               <h1 className="text-xs font-bold text-white bg-green-600 px-3 py-1 rounded-full inline-block mb-3">
//                 New Arrival
//               </h1>
//             )}
//             <Link
//               href={`/products/${product.slug}`}
//               className="block text-center bg-green-500 text-white py-2 px-5 rounded-full mt-4 hover:bg-green-600 transition-all duration-300"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProductPage;
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

export default ProductPage;
