"use client"; // Mark this file as a client component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaSignOutAlt,
  FaMoneyBillAlt,
  FaGlobe,
  FaMoon,
  FaQuestionCircle,
  FaDownload,
} from "react-icons/fa";
import SearchField from "../SearchFilter";

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false); // Sticky header state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Selected dropdown item

  // Sticky Header Effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle Mobile Menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Menu Items
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "#" },
    { title: "Tours", path: "/tour" },
    { title: "Contact", path: "/contactUs" },
    { title: "Blog", path: "#" },
  ];

  // Updated Dropdown Options
  const dropdownItems = [
    { title: "Log in or sign up", icon: <FaSignInAlt />, value: "login" },
    { title: "Currency", icon: <FaMoneyBillAlt />, value: "currency" },
    { title: "Language", icon: <FaGlobe />, value: "language" },
    { title: "Appearance", icon: <FaMoon />, value: "appearance" },
    { title: "Support", icon: <FaQuestionCircle />, value: "support" },
    { title: "Download the app", icon: <FaDownload />, value: "download" },
    { title: "Log out", icon: <FaSignOutAlt />, value: "logout" },
  ];

  return (
    <nav
      className={`navbar bg-base-100 shadow-md px-5 lg:px-20 ${
        isSticky ? "sticky-header" : ""
      }`}
    >
      {/* Navbar Start */}
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
          <SearchField />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-2xl ml-auto" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className="text-sm text-gray-700 hover:text-blue-500 relative group"
          >
            {item.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Navbar End */}
      <div className="navbar-end hidden lg:flex items-center gap-4">
        <button className="text-lg">
          <FaHeart />
        </button>
        <button className="text-lg">
          <FaShoppingCart />
        </button>

        {/* User Dropdown */}
        <div className="relative group">
          <button className="text-lg flex items-center">
            <FaUser />
          </button>
          {/* Dropdown Content with Fixed Size */}
          <div
            className="absolute right-0 mt-2 w-[416px] h-[416px] bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
            style={{ width: '416px', height: '416px' }} // Set fixed width and height
          >
            {dropdownItems.map((item) => (
              <div
                key={item.value}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                  selectedItem === item.value
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedItem(item.value)}
              >
                {item.icon} <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 flex justify-between items-center">
          <button
            onClick={toggleMenu}
            className="text-xl absolute top-4 right-4"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-4 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="text-base text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
