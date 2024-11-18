'use client';
import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getLocations } from '../../api/location'; // Import the service function

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<any[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const togglePopup = () => setPopupOpen(!popupOpen);

  // Fetch locations using the service function
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const locationData = await getLocations();
      setLocations(locationData || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Filter locations based on search input
  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredLocations([]);
    } else {
      const filtered = locations.filter((location) =>
        location.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery, locations]);

  // Navigate to location details
  const handleLocationSelect = (locationId: number) => {
    setSearchQuery('');
    setFilteredLocations([]);
    router.push(`/location/${locationId}`); // Navigates to the location details page
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      {/* Navbar for large screens */}
      <div className="hidden lg:flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="w-1/3 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image src="/logo.png" alt="Logo" width={60} height={40} />
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find places and things to do"
              className="w-full py-3 px-4 pl-10 pr-14 font-sans font-bold rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-full">
              Search
            </button>

            {/* Location Suggestions Dropdown */}
            {searchQuery && !loading && filteredLocations.length > 0 && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {filteredLocations.map((location) => (
                  <li
                    key={location.id}
                    onClick={() => handleLocationSelect(location.id)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{location.title}</span>
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
          <button className="text-gray-500 hover:text-gray-800">
            <FaSearch />
          </button>
          <button className="text-gray-500 hover:text-gray-800">
            <FaMapMarkerAlt />
          </button>
        </div>
      </div>

      {/* Navbar for small screens (hamburger menu) */}
      <div className="lg:hidden flex items-center justify-between">
        <div className="flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={60} height={40} />
        </div>

        {/* Hamburger Menu Icon */}
        <button onClick={togglePopup} className="text-gray-500">
          <FaBars size={24} />
        </button>
      </div>

      {/* Popup Menu for mobile */}
      {popupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex flex-col items-center justify-center">
          <button
            onClick={togglePopup}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <FaTimes />
          </button>
          <ul className="text-white text-center space-y-4">
            <li>
              <button onClick={togglePopup}>Home</button>
            </li>
            <li>
              <button onClick={togglePopup}>About</button>
            </li>
            <li>
              <button onClick={togglePopup}>Contact</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
