"use client";
import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaSearch, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const handleDatePickerClick = () => {
    setIsModalOpen(true); // Open the modal when "Anytime" is clicked
  };

  const handleSelectDate = (date: Date, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(date);
      // If start date is selected, disable past dates for the end date
      if (endDate && date > endDate) {
        setEndDate(null); // Reset the end date if it's before the new start date
      }
    } else {
      // Only set the end date if it's after the start date
      if (startDate && date >= startDate) {
        setEndDate(date);
      }
    }

    if (startDate && endDate) {
      setIsModalOpen(false); // Close modal if both dates are selected
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleTodayClick = (type: "start" | "end") => {
    const today = new Date();
    if (type === "start") {
      setStartDate(today);
    } else {
      setEndDate(today);
    }
  };

  const handleTomorrowClick = (type: "start" | "end") => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (type === "start") {
      setStartDate(tomorrow);
    } else {
      setEndDate(tomorrow);
    }
  };

  const renderCalendar = (type: "start" | "end") => {
    const today = new Date();
    const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    return (
      <div className="calendar-grid">
        {[startMonth, nextMonth].map((month, index) => (
          <div key={index} className="month-container">
            <h3>{month.toLocaleString("default", { month: "long" })}</h3>
            <div className="dates-grid">
              {[...Array(30)].map((_, day) => {
                const date = new Date(month.getFullYear(), month.getMonth(), day + 1);
                return (
                  <button
                    key={day}
                    onClick={() => handleSelectDate(date, type)}
                    className={`date-button ${date.toDateString() === (type === "start" ? startDate?.toDateString() : endDate?.toDateString()) ? 'selected' : ''}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="mr-14 hidden lg:flex flex-col p-4 relative w-full">
      <div className="relative flex items-center w-full space-x-4">
        {/* Location Search */}
        <div className="relative flex items-center w-1/3">
          <FaSearch className="absolute left-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => {
              if (searchQuery) {
                setFilteredLocations(
                  locations.filter((location) =>
                    location.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                );
              }
            }}
            className="w-full pl-12 pr-8 py-3 border border-gray-300 rounded-full"
            placeholder="Search locations..."
          />
          <button
            onClick={handleSearchClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Divider Line */}
        <div className="border-l-2 h-10"></div>

        {/* Date Picker */}
        <div className="relative flex items-center w-1/3">
          <div
            onClick={handleDatePickerClick}
            className="date-picker flex items-center border p-3 rounded-full cursor-pointer w-full justify-between"
          >
            <FaCalendarAlt className="text-gray-400" />
            <span>{startDate && endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : "Anytime"}</span>
            <FaChevronDown className="text-gray-400" />
          </div>
        </div>
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

      {/* Modal for date selection */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-20">
          <div className="modal-content bg-white p-6 rounded-lg max-w-3xl w-full">
            <h2 className="text-xl font-bold">Select Start and End Dates</h2>
            <div className="flex justify-between mt-4">
              <button onClick={() => handleTodayClick("start")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Today</button>
              <button onClick={() => handleTomorrowClick("start")} className="px-4 py-2 bg-blue-500 text-white rounded-md">Tomorrow</button>
            </div>
            <div className="flex justify-between mt-6">
              <div>{renderCalendar("start")}</div>
              <div>{renderCalendar("end")}</div>
            </div>
            <div className="mt-4">
              <button onClick={handleCloseModal} className="px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchField;
