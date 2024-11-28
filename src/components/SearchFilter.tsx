import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import Link from "next/link"; // Import Link for navigation

interface Location {
  id: number;
  title: string;
  image: string;
}

interface Tour {
  id: number;
  title: string;
  price: number;
}

interface SearchFieldProps {
  onSearch: (tours: Tour[]) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [locations, setLocations] = useState<Location[]>([]); // All locations from API
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]); // Filtered locations based on query
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // Selected location
  const [tours, setTours] = useState<Tour[]>([]); // Tours related to the selected location
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch locations data from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://btt.triumphdigital.co.th/api/locations?service_name"
        );
        const data = response.data.data || [];
        setLocations(data);
        setFilteredLocations(data); // Initialize with all locations
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredLocations([]); // Don't show suggestions if query is empty
    } else {
      setFilteredLocations(
        locations.filter((location) =>
          location.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, locations]);

  // Fetch tours when the selected location changes
  useEffect(() => {
    const fetchTours = async () => {
      if (selectedLocation) {
        try {
          const response = await axios.get(
            `https://btt.triumphdigital.co.th/api/tour/search?location_id=${selectedLocation.id}`
          );
          setTours(response.data.data || []);
          onSearch(response.data.data || []); // Pass tours to parent
        } catch (error) {
          console.error("Error fetching tours:", error);
          setError("Failed to fetch tours.");
        }
      }
    };

    fetchTours();
  }, [selectedLocation]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (selectedLocation) {
      // Fetch tours directly when the search button is clicked
      window.location.href = `/tours/${selectedLocation.id}`;
    } else {
      alert("Please select a location first.");
    }
  };

  // Handle location click
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.title); // Set the search input to the selected location title
    setFilteredLocations([]); // Clear the filtered locations after selection
  };

  return (
    <div className="mr-8 hidden lg:flex flex-col p-4 relative w-full">
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
          onClick={handleSearchClick}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Location Suggestions */}
      {searchQuery && filteredLocations.length > 0 && (
        <div className="locations-list mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-64 overflow-y-auto w-full absolute top-full left-0 z-10">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationClick(location)} // Handle location selection
              className="location-item flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-200"
            >
              <FaMapMarkerAlt className="w-5 h-5 text-gray-700" />
              <span className="text-lg">{location.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Show tours if a location is selected */}
      {selectedLocation && tours.length > 0 && (
        <div className="tours-list mt-4 w-full">
          <h3 className="font-bold text-xl mb-2">Tours in {selectedLocation.title}</h3>
          <div className="space-y-2 w-full">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="tour-item p-2 border rounded hover:bg-gray-100 cursor-pointer w-full"
              >
                <h4 className="text-lg">{tour.title}</h4>
                <p className="text-sm text-gray-600">Price: ${tour.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SearchField;
