"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaHeart, 
  FaShoppingCart, 
  FaUser, 
  FaGlobe, 
  FaDollarSign, 
  FaHeadset, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";

export default function NavBar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // State to track if header is sticky
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if hamburger menu is open

  const handleMouseEnter = () => setIsProfileOpen(true);
  const handleMouseLeave = () => setIsProfileOpen(false);

  const handleOptionClick = () => {
    setIsProfileOpen(false); // Close popup on option click
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle the menu visibility

  // Detect scroll and update sticky header state
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Dynamic menu items
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Tours", path: "/Tours" },
    { title: "Contact", path: "/contact" },
    { title: "Blog", path: "/blog" },
  ];

  return (
    <nav className={`navbar bg-base-100 shadow-md px-5 lg:px-20 ${isSticky ? 'sticky-header' : ''}`}>
      {/* Logo Section */}
      <div className="navbar-start flex justify-between items-center w-full">
        <Link href="/">
          <Image 
            src="/assets/logo.png" 
            alt="Logo" 
            width={60} 
            height={50} 
            className="cursor-pointer" 
          />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button 
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>

        {/* Search Section */}
        <div className="ml-4 hidden lg:flex">
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

      {/* Menu Section (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, index) => (
            <li className="group relative" key={index}>
              <Link
                href={item.path}
                className="flex flex-col items-center hover:bg-white text-gray-700 hover:text-primary active:bg-transparent"
              >
                {item.title}
                <span className="block h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Icons Section (Desktop Only) */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
        <button className="text-lg">
          <FaHeart />
        </button>
        <button className="text-lg">
          <FaShoppingCart />
        </button>
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-xl font-semibold mb-4">Profile Options</p>
              <ul className="space-y-4">
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick}
                >
                  <FaUser className="text-gray-600" />
                  <a href="/profile" className="text-gray-700">Profile</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick}
                >
                  <FaGlobe className="text-gray-600" />
                  <a href="#" className="text-gray-700">Language</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick}
                >
                  <FaDollarSign className="text-gray-600" />
                  <a href="#" className="text-gray-700">Currency</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick}
                >
                  <FaHeadset className="text-gray-600" />
                  <a href="#" className="text-gray-700">Support</a>
                </li>
                <li
                  className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md"
                  onClick={handleOptionClick}
                >
                  <FaUser className="text-gray-600" />
                  <a href="/logout" className="text-gray-700">Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Popup */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50">
          <div className="flex justify-between p-6">
            <Link href="/" className="text-xl font-bold">
              MyLogo
            </Link>
            <button onClick={toggleMenu} className="text-2xl">
              <FaTimes />
            </button>
          </div>

          <ul className="space-y-4 p-6">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="text-xl text-gray-700 hover:text-blue-500"
                  onClick={toggleMenu}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
