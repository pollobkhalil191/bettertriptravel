"use client";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Location {
  id: number;
  title: string;
  image: string;
}

const SearchField: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch locations from the API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "https://btt.triumphdigital.co.th/api/locations?service_name"
        );
        const data = response.data.data || [];
        setLocations(data);
        setFilteredLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setError("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on the search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredLocations([]);
    } else {
      setFilteredLocations(
        locations.filter((location) =>
          location.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, locations]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilteredLocations(
      locations.filter((location) =>
        location.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSearchClick = () => {
    if (selectedLocation) {
      router.push(`/Tours?location_id=${selectedLocation.id}`);
    } else {
      alert("Please select a location first.");
    }
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.title); // Set search query to the selected location's title
    setFilteredLocations([]); // Clear the dropdown
  };

  return (
    <div className="mr-14 hidden lg:flex flex-col p-4 relative w-full">
      <div className="relative flex items-center w-full">
        <FaSearch className="absolute left-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => {
            // Show suggestions when input gains focus if there's a query
            if (searchQuery) {
              setFilteredLocations(
                locations.filter((location) =>
                  location.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
              );
            }
          }}
          className="w-full pl-12 pr-28 py-3 border border-gray-300 rounded-full"
          placeholder="Search locations..."
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Render location suggestions only if there are filtered locations */}
      {filteredLocations.length > 0 && (
        <div className="locations-list mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-64 overflow-y-auto w-full absolute top-full left-0 z-10">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="location-item flex items-center space-x-3 p-2 border rounded cursor-pointer hover:bg-gray-200"
            >
              <FaMapMarkerAlt className="w-5 h-5 text-gray-700" />
              <span className="text-lg">{location.title}</span>
            </div>
          ))}
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default SearchField;
