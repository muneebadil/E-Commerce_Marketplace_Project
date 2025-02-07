"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <nav className="flex justify-between items-center px-6 py-4">
        {/* Brand Name */}
        <div className="text-2xl font-extrabold tracking-wide">
          <span className="text-green-400">Muneeb-</span>Shop
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          <Link href="/homepage" className="hover:text-green-400 transition duration-300">
            Products
          </Link>
          <Link href="/cart" className="hover:text-green-400 transition duration-300">
            Cart
          </Link>
          <Link href="/checkout" className="hover:text-green-400 transition duration-300">
            Checkout
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md transition duration-300">
            Login
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md transition duration-300">
            Signup
          </button>
        </div>

        {/* Mobile Menu (Sheet Drawer) */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="block md:hidden bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition duration-300">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-gray-900 text-white">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold text-green-400">Navigation</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6 text-lg">
              <Link href="/homepage" className="block hover:text-green-400 transition duration-300">
                Products
              </Link>
              <Link href="/cart" className="block hover:text-green-400 transition duration-300">
                Cart
              </Link>
              <Link href="/checkout" className="block hover:text-green-400 transition duration-300">
                Checkout
              </Link>
              <div className="mt-6">
                <button className="w-full bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md transition duration-300">
                  Login
                </button>
                <button className="w-full mt-3 bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md transition duration-300">
                  Signup
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
