// components/Filter.tsx

import React from "react";

interface FilterProps {
  filters: { price: string; language: string; duration: string; time: string };
  setFilters: React.Dispatch<React.SetStateAction<{
    price: string;
    language: string;
    duration: string;
    time: string;
  }>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setFilterPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters, sort, setSort, setFilterPopup }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-4">
        <select
          className="p-2 border rounded"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        >
          <option value="">Price</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
        >
          <option value="">Language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.duration}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
        >
          <option value="">Duration</option>
          <option value="short">Short</option>
          <option value="long">Long</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filters.time}
          onChange={(e) => setFilters({ ...filters, time: e.target.value })}
        >
          <option value="">Time</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <select
          className="p-2 border rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="recommended">Recommended</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>

        <button
          onClick={() => setFilterPopup(true)}
          className="p-2 bg-blue-500 z-[1111] text-white rounded"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
