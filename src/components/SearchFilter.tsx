import React, { useState } from "react";
import { DateRangePicker, RangeKeyDict, Range } from "react-date-range";
import { format, } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FiMapPin, FiCalendar, FiSearch } from "react-icons/fi";

const ProfessionalSearchField: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedDates, setSelectedDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [location, setLocation] = useState<string>("");

  const handleDateChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setSelectedDates([selection]);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSearch = () => {
    console.log(
      `Searching for ${location} from ${format(
        selectedDates[0].startDate as Date,
        "MMM dd"
      )} to ${format(selectedDates[0].endDate as Date, "MMM dd")}`
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Search Box Container */}
      <div className="flex justify-between p-1 bg-white border border-gray-300 rounded-full  overflow-hidden">
        {/* Location Input */}
        <div className="flex items-center px-4 py-2 w-1/3 border-r">
          <FiMapPin className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Date Picker */}
        <div
          className="flex items-center px-3 py-2 w-1/3  cursor-pointer"
          onClick={toggleCalendar}
        >
          <FiCalendar className="text-gray-400 mr-2" size={20} />
          <span className="text-gray-700">
            {`${format(selectedDates[0].startDate as Date, "MMM dd")} - ${format(
              selectedDates[0].endDate as Date,
              "MMM dd"
            )}`}
          </span>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full transition hover:bg-primary"
        >
          <FiSearch className="mr-2" size={20} />
          Search
        </button>
      </div>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
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

export default ProfessionalSearchField;
