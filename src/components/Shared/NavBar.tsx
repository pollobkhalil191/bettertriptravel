"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaGlobe, FaDollarSign, FaHeadset } from "react-icons/fa";

export default function NavBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // State to track if header is sticky

  const handleMouseEnter = () => setIsProfileOpen(true);
  const handleMouseLeave = () => setIsProfileOpen(false);

  const handleOptionClick = () => {
    setIsProfileOpen(false); // Close popup on option click
  };

  // Detect scroll and update sticky header state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // If the user scrolls down 100px
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar bg-base-100 shadow-md px-24 ${isSticky ? 'sticky-header' : ''}`}>
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
          {["Home", "About", "Tour", "Contact"].map((menu) => (
            <li className="group relative" key={menu}>
              <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-blue-500">
                {menu}
                <span className="block h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
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
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="text-lg">
            <FaUser />
          </button>

          {isProfileOpen && (
            <div
              className="absolute right-0 mt-2 w-[425px] h-[425px] bg-white shadow-lg rounded-lg p-6 z-50"
              onMouseEnter={handleMouseEnter} // Keep open if cursor enters popup
              onMouseLeave={handleMouseLeave} // Close when cursor leaves popup
            >
              <p className="text-xl font-semibold mb-4">Profile Options</p>
              <ul className="space-y-4">
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick} // Close popup on option click
                >
                  <FaUser className="text-gray-600" />
                  <a href="/profile" className="text-gray-700">Profile</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick} // Close popup on option click
                >
                  <FaGlobe className="text-gray-600" />
                  <a href="#" className="text-gray-700">Language</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick} // Close popup on option click
                >
                  <FaDollarSign className="text-gray-600" />
                  <a href="#" className="text-gray-700">Currency</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick} // Close popup on option click
                >
                  <FaHeadset className="text-gray-600" />
                  <a href="#" className="text-gray-700">Support</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick} // Close popup on option click
                >
                  <FaUser className="text-gray-600" />
                  <a href="/logout" className="text-gray-700">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
