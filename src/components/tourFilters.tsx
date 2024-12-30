"use client";

import React, { useState } from "react";

interface TourFiltersProps {
  locationId: number | null;
  setLocationId: (id: number | null) => void;
}

const TourFilters: React.FC<TourFiltersProps> = ({ locationId, setLocationId }) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const handleFilterChange = () => {
    // Trigger filters based on selected criteria (e.g., locationId, minPrice, maxPrice)
    console.log("Filters applied", { locationId, minPrice, maxPrice });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">Filter Tours</h3>

      {/* Location filter */}
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location ID
        </label>
        <input
          type="number"
          id="location"
          value={locationId ?? ""}
          onChange={(e) => setLocationId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Location ID"
        />
      </div>

      {/* Price filter */}
      <div className="mb-4">
        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Minimum Price"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Maximum Price"
        />
      </div>

      {/* Apply button */}
      <button
        onClick={handleFilterChange}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default TourFilters;
