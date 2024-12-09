import React from "react";

const CheckAvailability = () => {
  return (
    <div className="bg-primary p-6 rounded-lg text-white max-w-3xl  shadow-lg">
      {/* Title */}
      <h2 className="text-lg font-bold mb-4">Select participants, date, and language</h2>
      
      {/* Form */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Participants */}
        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2 w-full md:w-auto">
          <span className="mr-2 text-lg">👤</span>
          <select className="bg-transparent outline-none w-full md:w-auto">
            <option value="adult-1">Adult x 1</option>
            <option value="adult-2">Adult x 2</option>
            <option value="child-1">Child x 1</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2 w-full md:w-auto">
          <span className="mr-2 text-lg">📅</span>
          <input
            type="date"
            className="bg-transparent outline-none w-full md:w-auto"
          />
        </div>

        {/* Language */}
        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2 w-full md:w-auto">
          <span className="mr-2 text-lg">🌐</span>
          <select className="bg-transparent outline-none w-full md:w-auto">
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300">
          Check availability
        </button>
      </div>
    </div>
  );
};

export default CheckAvailability;
