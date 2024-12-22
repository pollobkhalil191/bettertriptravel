import { useState } from "react";
import Link from "next/link";


// Define type for the menu items to ensure strong typing
interface MenuItem {
  title: string;
  path: string;
}

const MobileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Function to toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Example menu items
  const menuItems: MenuItem[] = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center p-4 text-gray-800 dark:text-white"
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
        className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg z-50 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center">
          <button onClick={toggleMenu} className="text-xl absolute top-4 right-4">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="space-y-4 p-4">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link href={item.path} className="text-lg text-gray-800 dark:text-white hover:text-blue-600">
                {item.title}
              </Link>
            </li>
          ))}

          {/* Mobile Search Field */}
          {/* <li>
            <SearchField />
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
