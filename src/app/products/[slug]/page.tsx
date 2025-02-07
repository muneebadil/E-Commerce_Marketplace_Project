////////////////video se work 
import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import AddToCartButton from "@/component/addtocartbutton";
import { Image } from "next-sanity/image";


interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getproduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      "imageURL": productImage.asset->url,
      description,
      price,
      inventory,
      tags,
      discountPercentage
    }`,
    { slug }
  )
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getproduct(slug)

  return (
    <section className="min-h-screen bg-gray-900 text-white py-10">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
        <div className="flex flex-wrap items-center gap-10">
          {product.image && (
            <Image
              // src={urlFor(product.image).url()}
              src={product.imageURL}
              alt={product.title}
              width={500}
              height={500}
              className="rounded-lg bg-gray-700"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-400 mb-4">{product.title}</h1>
            <p className="text-gray-400 mb-6">{product.description}</p>
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Price: ${product.price}
            </h2>
            {product.discountPercentage && (
              <h3 className="text-sm text-red-400 mb-4">
                Discount: {product.discountPercentage}%
              </h3>
            )}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}