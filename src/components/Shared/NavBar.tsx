"use client"; // Mark this file as a client component

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchField from "../SearchFilter";
import MobileMenu from "./mobileMenu";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false); // Sticky header state
  // const [selectedItem, setSelectedItem] = useState<string | null>(null); // Selected dropdown item

  // Sticky Header Effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu Items
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Tours", path: "/tour" },
    { title: "Contact", path: "/contactUs" },
    { title: "Blog", path: "/login" },
  ];
  const { isAuthenticated } = useAuth();

  // Dropdown Items with Modifications
  // const dropdownItems = [
  //   {
  //     title: "Log in or sign up",
  //     icon: "c-signin",
  //     value: "login",
  //     path: "/login",
  //   },
  //   {
  //     title: "Currency",
  //     icon: "c-money",
  //     value: "currency",
  //     path: "/currency",
  //   },
  //   {
  //     title: "Language",
  //     icon: "c-globe",
  //     value: "language",
  //     path: "/language",
  //   },
  //   {
  //     title: "Appearance",
  //     icon: "c-moon",
  //     value: "appearance",
  //     path: "/appearance",
  //   },
  //   { title: "Support", icon: "c-support", value: "support", path: "/support" },
  //   { title: "Log out", icon: "c-logout", value: "logout", path: "/logout" },
  // ];

  return (
    <>
      <nav
        className={`navbar bg-base-100 shadow-md block px-5 lg:px-20 ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Navbar Start */}
          <div className="flex items-center gap-10 w-full">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={80}
                height={50}
                className="cursor-pointer w-16 sm:w-20 md:w-24 lg:w-16 xl:w-16"
              />
            </Link>

            {/* Search Field */}
            <div className="hidden lg:block ml-4 fixed-width">
              <SearchField
                onSearch={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>

          {/* Navbar End */}
          <div className="hidden lg:flex items-center gap-10">
            {/* Wishlist */}
            <button className="text-lg items-center">
              <svg
                className="w-6 h-6 text-secondary dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              <p className="text-sm font-gt-easti text-secondary items-center">
                wishlist
              </p>
            </button>

            {/* Cart */}
            <button className="text-lg">
              <svg
                className="w-6 h-6 text-secondary dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <p className="text-sm font-gt-easti text-secondary items-center">
                Cart
              </p>
            </button>

            {/* Login */}
            <div className="container mx-auto flex justify-between items-center">
              <div>
                {isAuthenticated ? (
                  <Link
                    href="/profile"
                    className="flex flex-col  items-center  "
                  >
                    {/* Profile Icon for Dashboard */}
                    <svg
                      className="w-6 h-6 text-secondary dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <span className="text-sm text-secondary font-semibold">
                      Profile
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="flex flex-col font-semibold  items-center text-secondary"
                  >
                    {/* Login Icon */}
                    <svg
                      className="w-6 h-6  dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <span className="text-sm text-secondary font-semibold">
                      Login
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>

        {/* Center Menu Items */}
        <div className="navbar-center hidden lg:flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="text-[16px] font-normal font-gt-easti text-primary hover:text-primary relative group"
            >
              {item.title}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
