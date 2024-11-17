// components/Header.tsx
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-yellow-500">Home</Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-yellow-500">About</Link>
          </li>
          <li>
            <Link href="/tour" className="hover:text-yellow-500">Tour</Link>
          </li>
          <li>
            <Link href="/tour-details" className="hover:text-yellow-500">Tour Details</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-yellow-500">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
