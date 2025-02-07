"use client";

import React from "react";
import { Product } from "../../types/products";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";


const AddToCartButton = ({ product }: { product: Product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    // Add your addToCart logic here yahan likhee h addtocart ki logic sweetalert2 se 
    Swal.fire({
      position:"top-start",
      icon: "success",
      title: `${product.title} added to Cart Perfectly`,
      showConfirmButton: false,
      timer: 1000
    })
    console.log("Product added to cart:", product);
  };

  return (
    <button
      className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition-colors duration-300"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
