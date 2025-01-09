"use client";

import { useState } from "react";

// Define types for the API response
type PersonType = {
  name: string;
  desc: string;
  min: string;
  max: string;
  price: string;
  display_price: string;
  number: string;
};

type AvailabilityItem = {
  id: number;
  active: number;
  price: string;
  is_default: boolean;
  textColor: string;
  price_html: string;
  max_guests: number;
  title_origin: string;
  event: string;
  title: string;
  end: string;
  start: string;
  person_types: PersonType[];
};

const CheckAvailabilityForm = () => {
  const [tourId, setTourId] = useState("6"); // Default tour ID
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forSingle, setForSingle] = useState("1"); // Default single person
  const [availability, setAvailability] = useState<AvailabilityItem[] | null>(
    null
  );
  const [error, setError] = useState("");

  const fetchAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAvailability(null);

    // Validate inputs
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(
        `https://btt.triumphdigital.co.th/api/tour/availability/${tourId}?start=${startDate}&end=${endDate}&for_single=${forSingle}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch availability.");
      }

      const data: AvailabilityItem[] = await response.json();
      setAvailability(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching availability."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Check Availability</h1>

      {/* Form */}
      <form onSubmit={fetchAvailability} className="space-y-4">
        {/* Tour ID */}
        <div>
          <label className="block font-medium text-gray-700">Tour ID</label>
          <input
            type="text"
            value={tourId}
            onChange={(e) => setTourId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* For Single */}
        <div>
          <label className="block font-medium text-gray-700">
            Single Booking
          </label>
          <select
            value={forSingle}
            onChange={(e) => setForSingle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Check Availability
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Availability Results */}
      {availability && (
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-4">Availability Results:</h2>
          {availability.length > 0 ? (
            <ul className="space-y-4">
              {availability.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                  <p>
                    <strong>Date:</strong> {item.start} to {item.end}
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price_html}
                  </p>
                  <p>
                    <strong>Max Guests:</strong> {item.max_guests}
                  </p>
                  <p>
                    <strong>Details:</strong> {item.event}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {item.person_types.map((type, index) => (
                      <li key={index}>
                        <strong>{type.name}:</strong> {type.desc} | Price:{" "}
                        {type.display_price}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No availability found for the selected dates.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckAvailabilityForm;
