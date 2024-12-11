
"use client"; // Add this line at the very top of the file


import React, { useState } from "react";

interface CheckAvailabilityProps {
  tourId: string; // Add the tourId prop here
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({ tourId }) => {
  const [participants, setParticipants] = useState("adult-1");
  const [date, setDate] = useState("");
  const [language, setLanguage] = useState("english");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tour ID: ${tourId}, Participants: ${participants}, Date: ${date}, Language: ${language}`);
  };

  return (
    <div className="bg-primary p-6 rounded-lg text-white max-w-3xl shadow-lg">
      <h2 className="text-lg font-bold mb-4">Select participants, date, and language</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4">
        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2 w-full md:w-auto">
          <span className="mr-2 text-lg">👤</span>
          <select
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="bg-transparent outline-none w-full md:w-auto"
          >
            <option value="adult-1">Adult x 1</option>
            <option value="adult-2">Adult x 2</option>
            <option value="child-1">Child x 1</option>
          </select>
        </div>

        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2 w-full md:w-auto">
          <span className="mr-2 text-lg">📅</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent outline-none w-full md:w-auto"
          />
        </div>

        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2 w-full md:w-auto">
          <span className="mr-2 text-lg">🌐</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent outline-none w-full md:w-auto"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-300"
          >
            Check availability
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckAvailability;
