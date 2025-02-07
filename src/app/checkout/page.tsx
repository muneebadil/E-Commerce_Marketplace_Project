"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

//   const handlePlaceOrder = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     const orderData = {
//       _type: "order",
//       firstName: formValues.firstName,
//       lastName: formValues.lastName,
//       address: formValues.address,
//       city: formValues.city,
//       zipcode: formValues.zipCode,
//       phone: formValues.phone,
//       email: formValues.email,
//       cartItems: cartItems.map((item) => ({
//         type: "reference",
//         ref: item._id,
//       })),
//       total: total,
//       discount: discount,
//       orderDate: new Date().toISOString(),
//     };

//     try {
//       await client.create(orderData);
//       localStorage.removeItem("appliedDiscount");
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };
const handlePlaceOrder = async () => {
    if (validateForm()) {
      const orderData = {
        _type: "order",
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: formValues.address,
        city: formValues.city,
        zipcode: formValues.zipCode,
        phone: formValues.phone,
        email: formValues.email,
        cartItems: cartItems.map((item) => ({
          _type: "reference",
          _ref: item._id,
        })),
        total: total,
        discount: discount,
        orderDate: new Date().toISOString(),
    };
  
      try {
        await client.create(orderData);
        localStorage.removeItem("appliedDiscount");
        alert("Order placed successfully!");
      } catch (error) {
        console.error("Sanity Order Error:", error);
        alert("Order placement failed! Check console for details.");
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4 text-gray-400">
            <Link href="/cart" className="hover:text-white transition text-sm">
              Cart
            </Link>
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b border-gray-700"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-xs text-gray-400">
                      Quantity: {item.inventory}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${item.price * item.inventory}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-medium">-${discount}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "firstName",
                "lastName",
                "address",
                "city",
                "zipCode",
                "phone",
                "email",
              ].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-gray-400">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    placeholder={`Enter your ${field}`}
                    value={formValues[field as keyof typeof formValues]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors[field as keyof typeof formErrors] && (
                    <p className="text-sm text-red-500">
                      {field.charAt(0).toUpperCase() + field.slice(1)} is
                      required.
                    </p>
                  )}
                </div>
              ))}
            </div>
            <button
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 shadow-lg"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
