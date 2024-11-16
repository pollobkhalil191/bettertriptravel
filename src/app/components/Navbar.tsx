// src/app/components/Navbar.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-lg">
          BetterTripTravel
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/home" className="text-white hover:text-blue-200">Home</Link>
          <Link href="/tours" className="text-white hover:text-blue-200">Tours</Link>
          <Link href="/about" className="text-white hover:text-blue-200">About Us</Link>
          <Link href="/contact" className="text-white hover:text-blue-200">Contact</Link>
        </div>

        <button onClick={toggleMenu} className="text-white md:hidden focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-600 flex flex-col space-y-4 mt-2 p-4">
          <Link href="/home" className="text-white hover:text-blue-200" onClick={toggleMenu}>Home</Link>
          <Link href="/tours" className="text-white hover:text-blue-200" onClick={toggleMenu}>Tours</Link>
          <Link href="/about" className="text-white hover:text-blue-200" onClick={toggleMenu}>About Us</Link>
          <Link href="/contact" className="text-white hover:text-blue-200" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
