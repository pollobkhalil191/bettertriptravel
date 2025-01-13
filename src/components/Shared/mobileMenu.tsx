import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  title: string;
  path: string;
}

const MobileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems: MenuItem[] = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Tours", path: "/tours" },
    { title: "Contact", path: "/contact" },
    { title: "Blog", path: "/blog" },
  ];

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden flex items-center justify-center p-4 text-gray-800 dark:text-white"
        aria-label="Toggle Mobile Menu"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-64 bg-white dark:bg-gray-900 h-full shadow-lg z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Menu Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-700">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={100}
            height={40}
            className="cursor-pointer"
          />
          <button
            onClick={toggleMenu}
            className="text-xl"
            aria-label="Close Menu"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-6 p-4">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                onClick={toggleMenu}
                className="text-lg text-gray-800 dark:text-white hover:text-blue-600 font-medium block"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="mt-6 px-4 space-y-4">
          <button className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
            Log In
          </button>
          <button className="w-full py-2 px-4 text-blue-600 border border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-md">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
