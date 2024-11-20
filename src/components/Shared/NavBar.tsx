"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

export default function NavBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar bg-base-100  shadow-md px-24">
      {/* Logo Section */}
      <div className="navbar-start">
        <a className="text-xl font-bold">MyLogo</a>
        {/* Search Section */}
        <div className="ml-4">
          <div className="relative flex items-center">
            <FaSearch className="absolute left-4 text-gray-400" />
            <input
              type="text"
              className="w-full pl-12 pr-28 py-4 border border-gray-300 rounded-full"
              placeholder="Search..."
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full mx-2">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Tour</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>

      {/* Icons Section */}
      <div className="navbar-end flex items-center gap-4">
        {/* Wishlist Icon */}
        <button className="text-lg">
          <FaHeart />
        </button>
        {/* Cart Icon */}
        <button className="text-lg">
          <FaShoppingCart />
        </button>
        {/* Profile Icon */}
        <div className="relative">
          <button onClick={toggleProfilePopup} className="text-lg">
            <FaUser />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
              <p className="font-semibold">Profile Options</p>
              <ul>
                <li className="py-2 hover:bg-gray-100">
                  <a href="/profile">View Profile</a>
                </li>
                <li className="py-2 hover:bg-gray-100">
                  <a href="/settings">Settings</a>
                </li>
                <li className="py-2 hover:bg-gray-100">
                  <a href="/logout">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
