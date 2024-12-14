"use client"; // Ensure this file is client-side

import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaGlobe } from "react-icons/fa"; // Import React Icons

interface CheckAvailabilityProps {
  tourId: string; // Props for tourId
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({ tourId }) => {
  const [participants, setParticipants] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  });
  const [date, setDate] = useState("");
  const [language, setLanguage] = useState("english");
  const [isParticipantModalOpen, setParticipantModalOpen] = useState(false); // Modal visibility state

  // Handle participant count change
  const handleParticipantChange = (category: string, action: string) => {
    setParticipants((prev) => {
      const updated = { ...prev };
      if (action === "increment") updated[category] += 1;
      else if (action === "decrement" && updated[category] > 0) updated[category] -= 1;
      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tour ID: ${tourId}, Participants: ${JSON.stringify(participants)}, Date: ${date}, Language: ${language}`);
  };

  return (
    <div className="bg-primary p-6 rounded-lg text-white max-w-3xl shadow-lg">
      <h2 className="text-lg font-bold mb-4">Select participants, date, and language</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Participant Selector */}
        <div
          className="relative flex items-center bg-white text-black rounded-lg shadow px-4 py-2 cursor-pointer"
          onClick={() => setParticipantModalOpen(!isParticipantModalOpen)}
        >
          <FaUser className="mr-2 text-lg" />
          <span>{`${participants.adult} Adult(s), ${participants.children} Child(ren), ${participants.infant} Infant(s)`}</span>
        </div>

        {/* Modal for Participant Selection */}
        {isParticipantModalOpen && (
          <div className="absolute z-10 bg-white border rounded-lg shadow-lg mt-2 w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <span>Adult (Age 11-99)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleParticipantChange("adult", "decrement")}
                >
                  -
                </button>
                <span>{participants.adult}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleParticipantChange("adult", "increment")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Children (Age 4-10)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleParticipantChange("children", "decrement")}
                >
                  -
                </button>
                <span>{participants.children}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleParticipantChange("children", "increment")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Infant (Age 3 and younger)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleParticipantChange("infant", "decrement")}
                >
                  -
                </button>
                <span>{participants.infant}</span>
                <button
                  type="button"
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => handleParticipantChange("infant", "increment")}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
              onClick={() => setParticipantModalOpen(false)} // Close modal
            >
              Done
            </button>
          </div>
        )}

        {/* Date Selector */}
        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2">
          <FaCalendarAlt className="mr-2 text-lg" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* Language Selector */}
        <div className="flex items-center bg-white text-black rounded-lg shadow px-4 py-2">
          <FaGlobe className="mr-2 text-lg" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent outline-none w-full"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Check availability
        </button>
      </form>
    </div>
  );
};

export default CheckAvailability;
