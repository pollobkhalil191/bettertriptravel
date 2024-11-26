import React, { useState, useEffect } from "react";

const PriceFilterPopup = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: { price: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      price: string;
    }>
  >;
}) => {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  useEffect(() => {
    if (filters.price) {
      const [min, max, curr] = filters.price.split("-");
      setMinPrice(min || "");
      setMaxPrice(max || "");
      setCurrency(curr || "USD");
    }
  }, [filters.price]);

  const applyPriceFilter = () => {
    const priceFilter = `${minPrice}-${maxPrice}-${currency}`;
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: priceFilter,
    }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[456px] h-[235px] relative"
        style={{ width: "456px", height: "235px" }}
      >
        <h2 className="text-lg font-bold mb-4">Set Price Range</h2>

        {/* Min Price */}
        <div className="mb-4">
          <label htmlFor="minPrice" className="block text-sm font-semibold mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Max Price */}
        <div className="mb-4">
          <label htmlFor="maxPrice" className="block text-sm font-semibold mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Currency */}
        <div className="mb-4">
          <label htmlFor="currency" className="block text-sm font-semibold mb-1">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BDT">BDT</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={applyPriceFilter}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceFilterPopup;
