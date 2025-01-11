"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const CheckAvailabilityForm = ({ tourId }: { tourId: string | number }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [forSingle, setForSingle] = useState("1");
  const [availability, setAvailability] = useState<AvailabilityItem[] | null>(
    null
  );
  const [error, setError] = useState("");
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null); // New state to track availability

  const fetchAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAvailability(null);
    setIsAvailable(null); // Reset availability state before fetching

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(
        `https://btt.triumphdigital.co.th/api/tour/availability/${tourId}?start=${startDate.toISOString()}&end=${endDate.toISOString()}&for_single=${forSingle}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch availability.");
      }

      const data: AvailabilityItem[] = await response.json();
      setAvailability(data);

      if (data.length > 0) {
        setIsAvailable(true); // If data exists, tour is available
      } else {
        setIsAvailable(false); // No data, tour is unavailable
      }

      const bookedDates = data.flatMap((item) => {
        const start = new Date(item.start);
        const end = new Date(item.end);
        const dates = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d));
        }
        return dates;
      });
      setUnavailableDates(bookedDates);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching availability."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Check Availability
      </h1>

      <form onSubmit={fetchAvailability} className="space-y-6">
        {/* Start Date and End Date */}
        <div className="flex flex-wrap gap-6">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={unavailableDates}
              placeholderText="Select start date"
              className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={unavailableDates}
              placeholderText="Select end date"
              className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">
              Single Booking
            </label>
            <select
              value={forSingle}
              onChange={(e) => setForSingle(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Check Availability
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 mt-6 text-center font-medium">{error}</p>
      )}

      {/* Availability Status */}
      {isAvailable !== null && (
        <p
          className={`mt-6 text-center font-medium ${
            isAvailable ? "text-green-600" : "text-red-600"
          }`}
        >
          {isAvailable
            ? "Tour is available!"
            : "Tour is not available for the selected dates."}
        </p>
      )}

      {/* Availability Results */}
      {availability && isAvailable && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Availability Results
          </h2>
          {availability.length > 0 ? (
            <ul className="space-y-4">
              {availability.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                  <p className="font-medium text-gray-700">
                    <strong>Date:</strong> {item.start} to {item.end}
                  </p>
                  <p className="font-medium text-gray-700">
                    <strong>Price:</strong> {item.price_html}
                  </p>
                  <p className="font-medium text-gray-700">
                    <strong>Max Guests:</strong> {item.max_guests}
                  </p>
                  <p className="font-medium text-gray-700">
                    <strong>Details:</strong> {item.event}
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600">
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
            <p className="text-gray-600 text-lg">
              No availability found for the selected dates.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckAvailabilityForm;
