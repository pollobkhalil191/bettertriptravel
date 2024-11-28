"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  
} from "react-icons/fa";

// Define types
interface Location {
  id: number;
  name: string;
}

interface Tour {
  id: number;
  title: string;
  description: string;
}

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false); // Sticky header state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [searchQuery, setSearchQuery] = useState(""); // Input value
  const [locationResults, setLocationResults] = useState<Location[]>([]); // Filtered locations
  const [tours, setTours] = useState<Tour[]>([]); // Tours data
  const [isProfileOpen, setIsProfileOpen] = useState(false); // User profile popup state

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

  // Handle input change and fetch locations
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get<{ locations: Location[] }>(
          `https://btt.triumphdigital.co.th/api/locations?service_name=${query}`
        );
        setLocationResults(response.data.locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    } else {
      setLocationResults([]);
    }
  };

  // Fetch tours for a specific location
  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const selectedLocation = locationResults.find(
        (loc) => loc.name.toLowerCase() === searchQuery.toLowerCase()
      );

      if (selectedLocation) {
        const response = await axios.get<{ tours: Tour[] }>(
          `https://btt.triumphdigital.co.th/api/tour/search?location_id=${selectedLocation.id}`
        );
        setTours(response.data.tours || []);
      } else {
        alert("No matching location found!");
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
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
      <div className="navbar-start flex justify-between items-center w-full">
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
        <div className="mr-8 hidden lg:flex">
          <div className="relative flex items-center w-full">
            <FaSearch className="absolute left-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full pl-12 pr-28 py-4 border border-gray-300 rounded-full"
              placeholder="Search locations..."
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full mx-2"
            >
              Search
            </button>
          </div>
          {/* Location Suggestions */}
          {locationResults.length > 0 && (
            <ul className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-64 overflow-y-auto w-full z-50">
              {locationResults.map((loc) => (
                <li
                  key={loc.id}
                  onClick={() => setSearchQuery(loc.name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {loc.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hamburger Icon */}
        <button className="lg:hidden text-2xl" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {/* Centered Menu Items */}
      <div className="navbar-center hidden lg:flex items-center gap-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className="text-lg text-gray-700 hover:text-blue-500 relative group"
          >
            {item.title}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Icons */}
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

      {/* Display Tours */}
      {tours.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Tours:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <li key={tour.id} className="border p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg">{tour.title}</h4>
                <p>{tour.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
