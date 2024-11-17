'use client'; // This marks the file as a client component

import { useState } from 'react';
import Image from 'next/image'; // Use next/image for optimized images
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import Link from 'next/link'; // Use Link for navigation

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo and Search Bar */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={60} height={40} /> {/* Replace with your logo path */}
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full font-body py-3 px-4 pl-10 pr-14 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full">
              Search
            </button>
          </div>
        </div>

        {/* Right-side icons */}
        <div className="flex items-center space-x-6">
          <FaHeart className="text-xl text-gray-600 cursor-pointer" />
          <FaShoppingCart className="text-xl text-gray-600 cursor-pointer" />
          <FaUser className="text-xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between">
        {/* Logo */}
        <Link href="#"><div className="text-xl font-bold text-blue-600">
          
          <Image src="/path/to/logo.png" alt="Logo" width={120} height={40} />
          
        </div></Link>

        {/* Hamburger Menu */}
        <button onClick={toggleMenu} className="text-2xl text-gray-600">
          ☰
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white shadow-md z-50">
            <div className="flex justify-end p-6">
              <button onClick={toggleMenu} className="text-3xl text-gray-600">
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Link href="/" className="text-xl text-gray-600 py-2">Home</Link>
              <Link href="/wishlist" className="text-xl text-gray-600 py-2">Wishlist</Link>
              <Link href="/cart" className="text-xl text-gray-600 py-2">Cart</Link>
              <Link href="/profile" className="text-xl text-gray-600 py-2">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
