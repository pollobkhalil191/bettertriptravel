"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const CheckAvailabilityForm = ({ tourId }: { tourId: string | number }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [forSingle, setForSingle] = useState("1"); // Default single person
  const [availability, setAvailability] = useState<AvailabilityItem | null>(
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
        `https://btt.triumphdigital.co.th/api/tour/availability/${tourId}?start=${
          startDate.toISOString().split("T")[0]
        }&end=${endDate.toISOString().split("T")[0]}&for_single=${forSingle}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch availability.");
      }

      const data: AvailabilityItem[] = await response.json();
      if (data.length > 0) {
        // Combine all the data into one result card for the selected range
        setAvailability({
          ...data[0],
          start: startDate.toISOString().split("T")[0],
          end: endDate.toISOString().split("T")[0],
        });
      } else {
        setError("No availability found for the selected dates.");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching availability."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-primary shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-white">
        Check Availability
      </h1>

      {/* Form */}
      <form onSubmit={fetchAvailability} className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Start Date */}
          <div className="flex-1">
            <label className="block font-medium text-white">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select Start Date"
              className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="flex-1">
            <label className="block font-medium text-white">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              placeholderText="Select End Date"
              className="mt-1 block w-full p-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* For Single */}
          <div>
            <label className="block font-medium text-white">Single</label>
            <select
              value={forSingle}
              onChange={(e) => setForSingle(e.target.value)}
              className="mt-1 block w-full rounded-md p-1 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Check Availability
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Availability Results */}
      {availability && (
        <div className="mt-6">
          <h2 className="text-xl text-white font-medium mb-4">
            Availability Result:
          </h2>
          <div className="p-4 border rounded-md shadow-sm bg-gray-50">
            <p className="font-medium text-gray-700">
              <strong>Date:</strong> {availability.start} to {availability.end}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Price:</strong> {availability.price_html}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Max Guests:</strong> {availability.max_guests}
            </p>
            <p className="font-medium text-gray-700">
              <strong>Details:</strong>{" "}
              {availability.event.replace(/<br\s*\/?>/g, ", ")}
            </p>
            <ul className="mt-2 space-y-1 text-gray-600">
              {availability.person_types.map((type, index) => (
                <li key={index}>
                  <strong>{type.name}:</strong> {type.desc} | Price:{" "}
                  {type.display_price}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckAvailabilityForm;
