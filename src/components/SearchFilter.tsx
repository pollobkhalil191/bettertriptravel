import React, { useState, useEffect } from "react";
import { DateRangePicker, RangeKeyDict, Range } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaMapMarkerAlt } from "react-icons/fa"; // Location icon
import { FiCalendar } from "react-icons/fi"; // Calendar icon
import fetchLocations from "../Api/location"; // Import the fetchLocations function

interface Location {
  title: string;
  id: number;
}

interface LocationAndDateSearchProps {
  onSearch: (locationId: number, startDate: string, endDate: string) => void; // Callback to pass selected data
}

const LocationAndDateSearch: React.FC<LocationAndDateSearchProps> = ({ onSearch }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch locations based on the search term
  useEffect(() => {
    const fetchLocationData = async () => {
      if (searchTerm.trim().length < 1) {
        setLocations([]); // Clear results when search is empty
        return;
      }

      setIsLoading(true);
      setError(null); // Reset error state on new fetch request

      try {
        const fetchedLocations = await fetchLocations(searchTerm);
        const filteredLocations = fetchedLocations.filter((location: { title: string }) =>
          location.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        setLocations(filteredLocations);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch locations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm.length > 0) {
      fetchLocationData();
    } else {
      setLocations([]); // Clear locations when search term is empty
    }
  }, [searchTerm]);

  const handleLocationSelect = (location: string) => {
    setSearchTerm(location); // Set the search term to the selected location
    setLocations([]); // Clear the search results after selecting a location
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setSelectedDates([selection]);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSearch = () => {
    const selectedLocation = locations.find(
      (location) => location.title === searchTerm
    );
    if (selectedLocation) {
      // Ensure startDate and endDate are valid before passing them to the parent
      const startDate = selectedDates[0].startDate;
      const endDate = selectedDates[0].endDate;
  
      if (startDate && endDate) {
        // Assume you have a location ID in the location object, e.g. `id: number`
        const locationId = selectedLocation.id; // Update this line to use the actual ID property
        onSearch(
          locationId, // Pass the location ID instead of the title
          format(startDate, "yyyy-MM-dd"),
          format(endDate, "yyyy-MM-dd")
        );
      }
    }
  };
  

  return (
    <div className="relative p-4">
      {/* Search Box Container */}
      <div className="flex bg-white border border-gray-300 rounded-full overflow-hidden">
        {/* Location Search Input */}
        <div className="flex items-center px-4 border-r">
          <FaMapMarkerAlt className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
            className="w-full bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
            placeholder="Search for a location"
          />
          {isLoading && (
            <div className="absolute top-full left-0 w-full p-2 text-center text-gray-600">
              <span>Loading...</span>
            </div>
          )}
          {error && (
            <div className="absolute top-full left-0 w-full p-2 text-center text-red-500">
              {error}
            </div>
          )}
          {locations.length > 0 && searchTerm.trim().length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg mt-2 max-h-48 overflow-y-auto z-10">
              {locations.map((location) => (
                <li
                  key={location.title} // Use unique title for key prop
                  className="p-4 cursor-pointer hover:bg-gray-100 flex items-center space-x-3 transition-all duration-200 ease-in-out"
                  onClick={() => handleLocationSelect(location.title)} // Select location
                >
                  <FaMapMarkerAlt className="text-blue-500" /> {/* Location Icon */}
                  <span className="text-gray-800">{location.title}</span>
                </li>
              ))}
            </ul>
          )}
          {locations.length === 0 && searchTerm.trim().length > 0 && !isLoading && !error && (
            <div className="absolute top-full left-0 w-full p-2 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div
          className="flex items-center text-sm px-3 py-2 w-1/3 cursor-pointer"
          onClick={toggleCalendar}
        >
          <FiCalendar className="text-gray-400 mr-2" size={20} />
          <span className="text-gray-700">
            {selectedDates[0].startDate && selectedDates[0].endDate
              ? `${format(selectedDates[0].startDate, "MMM dd")} - ${format(
                  selectedDates[0].endDate,
                  "MMM dd"
                )}`
              : "Select Dates"}
          </span>
        </div>
        <button className="btn-primary bg-primary text-sm m-1 rounded-full p-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="absolute mt-2 bg-white border  border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <DateRangePicker
            ranges={selectedDates}
            onChange={handleDateChange}
            months={2}
            direction="horizontal"
            showDateDisplay={false}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowCalendar(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAndDateSearch;
