"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Muneeb Shop</h2>
          <p className="mt-2 text-gray-400">
            Your one-stop shop for the best products. Quality, affordability, and trust—delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/homepage" className="hover:text-blue-400 transition">Shop</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Contact</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Customer Service</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="#" className="hover:text-blue-400 transition">Shipping & Delivery</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Returns & Refunds</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" className="hover:text-blue-500 text-xl transition"><FaFacebook /></a>
            <a href="https://instagram.com" className="hover:text-pink-500 text-xl transition"><FaInstagram /></a>
            <a href="https://twitter.com" className="hover:text-blue-400 text-xl transition"><FaTwitter /></a>
            <a href="https://youtube.com" className="hover:text-red-500 text-xl transition"><FaYoutube /></a>
          </div>
          <p className="mt-4 text-gray-400">Email: support@muneebshop.com</p>
          <p className="text-gray-400">Phone: +92 300 1234567</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Muneeb Shop. All rights reserved.
      </div>
    </footer>
  );
}
