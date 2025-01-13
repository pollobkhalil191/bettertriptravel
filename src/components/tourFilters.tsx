// components/FilterButton.tsx
import { useState } from "react";

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Filter Button */}
      <button
        onClick={openModal}
        className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded-md"
      >
        {/* Filter Icon as SVG */}
        <svg
          className="w-6 h-6 text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
          />
        </svg>
        <span>Filter</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold">Filter Tours</h3>

            {/* Filter Options */}
            <form className="space-y-4 mt-4">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="mt-1 block w-full p-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="adventure">Adventure</option>
                  <option value="nature">Nature</option>
                  <option value="city">City</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price Range
                </label>
                <input
                  type="range"
                  id="price"
                  min="0"
                  max="1000"
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tour Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              </div>
            </form>

            {/* Modal Close Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-1 px-4 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
