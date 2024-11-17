'use client'; // Mark the file as a client component
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaHeart, FaShoppingCart ,FaUser, FaMapMarkerAlt } from 'react-icons/fa'; // Added location pin icon
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<any[]>([]); // Store all location data
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]); // Store filtered location suggestions based on search query
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // API call to get location suggestions
  const fetchLocations = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://btt.triumphdigital.co.th/api/locations?service_name');
      console.log('API response:', response.data); // Debug log to check the data

      // Assuming the API returns an array of location data under 'data'
      setLocations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(); // Fetch locations when the component mounts
  }, []);

  // Filter locations based on the search query
  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredLocations([]); // Clear filtered locations if query is empty
    } else {
      const filtered = locations.filter((location) =>
        location.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery, locations]);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo and Search Bar */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={60} height={40} />
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update query on input change
              placeholder="Search by location..."
              className="w-full py-3 px-4 pl-10 pr-14 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full">
              Search
            </button>

            {/* Location Suggestions Dropdown */}
            {searchQuery && !loading && filteredLocations.length > 0 && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {filteredLocations.map((location, index) => (
                  <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2">
                    {/* Location Pin Icon */}
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{location.title}</span> {/* Displaying location name */}
                  </li>
                ))}
              </ul>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <p className="text-center py-2 text-gray-500">Loading...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right-side icons */}
        <div className="flex items-center space-x-6">
          <FaHeart className="text-xl text-gray-600 cursor-pointer" />
          <FaShoppingCart className="text-xl text-gray-600 cursor-pointer" />
          <FaUser className="text-xl text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          <Image src="/path/to/logo.png" alt="Logo" width={120} height={40} />
        </div>

        {/* Hamburger Menu */}
        <button onClick={toggleMenu} className="text-2xl text-gray-600">
          ☰
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white shadow-md z-50">
            <div className="flex justify-end p-6">
              <button onClick={toggleMenu} className="text-3xl text-gray-600">
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Link href="/" className="text-xl text-gray-600 py-2">Home</Link>
              <Link href="/wishlist" className="text-xl text-gray-600 py-2">Wishlist</Link>
              <Link href="/cart" className="text-xl text-gray-600 py-2">Cart</Link>
              <Link href="/profile" className="text-xl text-gray-600 py-2">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
