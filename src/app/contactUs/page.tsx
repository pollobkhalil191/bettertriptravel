import React from "react";

const HelpCenter = () => {
  return (
    <div className="flex flex-col items-center py-10 px-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Welcome to the Help Center
      </h1>

      {/* Search Box */}
      <div className="w-full max-w-lg flex items-center mb-10">
        <input
          type="text"
          placeholder="Cancellation, meeting point, etc."
          className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6-10.6 7.5 7.5 0 0010.6 10.6z"
            />
          </svg>
        </button>
      </div>

      {/* Topics List */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <p className="text-gray-600 text-sm md:text-base mb-5 text-center">
          Or browse by topic
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "Plan, search and book",
            "Activity information",
            "Booking confirmation, voucher and tickets",
            "Meeting point and pickup",
            "On the day of the activity",
            "Booking management",
          ].map((topic, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer shadow-sm transition duration-200 ease-in-out"
            >
              <span className="text-gray-800 font-medium">{topic}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>

      {/* Help Section */}
      <div className="w-full max-w-lg mt-12 p-6 bg-blue-50 border border-blue-300 rounded-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Still need help?</h2>
        <p className="text-sm text-gray-600 mb-4">
          Please enter a valid booking reference. It’s located on your voucher or booking confirmation and begins with GYG.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Can’t find your booking reference? Contact us via the{' '}
          <a href="#" className="text-blue-500 underline hover:text-blue-600">GetYourGuide app</a>.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Booking reference"
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
