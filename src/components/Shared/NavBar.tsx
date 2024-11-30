"use client"; // Mark this file as a client component

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import SearchField from "../SearchFilter"; // Ensure the correct import

// Define Tour type
interface Tour {
  id: number;
  title: string;
  price: number;
}

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false); // Sticky header state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isProfileOpen, setIsProfileOpen] = useState(false); // User profile popup state
  const [searchResults, setSearchResults] = useState<Tour[]>([]); // Initialize searchResults with an empty array

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle the search results from SearchField
  const handleSearch = (tours: Tour[]) => {
    setSearchResults(tours); // Set search results in state
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle profile popup
  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Dynamic menu items
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "#" },
    { title: "Tours", path: "/Tours" },
    { title: "Contact", path: "#" },
    { title: "Blog", path: "#" },
  ];

  return (
    <nav
      className={`navbar bg-base-100 shadow-md px-5 lg:px-20 ${
        isSticky ? "sticky-header" : ""
      }`}
    >
      <div className="navbar-start flex items-center w-full">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={60}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Search Field */}
        <div className="hidden lg:block ml-4">
          <SearchField onSearch={handleSearch} /> {/* Pass handleSearch as onSearch prop */}
        </div>

        {/* Hamburger Icon */}
        <button className="lg:hidden text-2xl ml-auto" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {/* Menu Items (Desktop) */}
      <div className="navbar-center hidden lg:flex gap-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="text-sm text-gray-700 hover:text-blue-500 relative group"
          >
            {item.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Icons (Desktop) */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
        <button className="text-lg">
          <FaHeart />
        </button>
        <button className="text-lg">
          <FaShoppingCart />
        </button>
        <button className="text-lg" onClick={toggleProfilePopup}>
          <FaUser />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          {/* Close Button */}
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={toggleMenu} className="text-xl absolute top-4 right-4">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-4 mt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-base text-gray-700 hover:text-blue-500"
              onClick={toggleMenu} // Close menu on click
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay (For closing the menu when clicking outside) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Optionally show search results */}
      {searchResults.length > 0 && (
        <div className="search-results mt-4 bg-white shadow-lg rounded-lg p-4">
          <h3 className="font-bold text-xl">Search Results</h3>
          <ul>
            {searchResults.map((tour) => (
              <li key={tour.id} className="p-2 border-b">
                {tour.title} - ${tour.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
