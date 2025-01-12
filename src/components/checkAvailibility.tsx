"use client";

import { useState, useEffect, ReactNode } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchTourDetails } from "../Api/tourDetails"; // Adjust based on your API file path
import AddToCartButton from "./addToCarBtn";

type PersonType = {
  name: string;
  desc: string;
  min: string;
  max: string;
  price: string;
};

type BookingFee = {
  name: string;
  desc: string;
  price: string;
  type: string; // one_time or other
};

type AvailabilityItem = {
  sale_price: ReactNode;
  id: number;
  active: number;
  price: string;
  max_guests: number;
  start: string;
  end: string;
  person_types: PersonType[];
  booking_fee: BookingFee[];
};

const CheckAvailabilityForm = ({ tourId }: { tourId: string | number }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<{ adult: number; child: number }>({
    adult: 1, // Default 1 adult
    child: 0,
  });
  const [availability, setAvailability] = useState<AvailabilityItem | null>(
    null
  );
  const [serviceFee, setServiceFee] = useState(false); // Service fee checkbox state
  const [basePrice, setBasePrice] = useState(0); // Tour base price
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const token = "your-token-here"; // Define your token here or fetch it from a secure source

  // Fetch tour details on component mount
  useEffect(() => {
    const fetchTourDetailsData = async () => {
      try {
        const tourDetails = await fetchTourDetails(tourId);
        const price = parseFloat(String(tourDetails?.data?.sale_price || "0"));
        setBasePrice(price);
        setTotalPrice(price); // Initial price for 1 adult
      } catch (err) {
        setError("Failed to fetch tour details.");
        console.error(err);
      }
    };

    fetchTourDetailsData();
  }, [tourId]);

  // Update total price dynamically
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateTotalPrice = () => {
    const additionalAdultPrice = 1000;
    const childPrice = 300;
    const serviceFeePrice = 100;

    let total =
      basePrice +
      (guests.adult - 1) * additionalAdultPrice + // Additional adults
      guests.child * childPrice; // Children

    if (serviceFee) {
      total += serviceFeePrice;
    }

    setTotalPrice(total);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [guests, serviceFee, updateTotalPrice]); // Recalculate whenever guests or service fee changes

  // Handle guest count increment/decrement
  const handleGuestChange = (
    type: "adult" | "child",
    operation: "increment" | "decrement"
  ) => {
    setGuests((prevGuests) => {
      const newCount =
        operation === "increment"
          ? prevGuests[type] + 1
          : Math.max(0, prevGuests[type] - 1); // Minimum 0 for guests
      return { ...prevGuests, [type]: newCount };
    });
  };

  // Handle form submission (check availability)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(
        `https://btt.triumphdigital.co.th/api/tour/availability/${tourId}?start=${
          startDate.toISOString().split("T")[0]
        }&end=${endDate.toISOString().split("T")[0]}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch availability.");
      }

      const data: AvailabilityItem[] = await response.json();
      if (data.length > 0) {
        setAvailability(data[0]);
        setIsAvailable(true);
        setShowResults(true);
      } else {
        setError("No availability found for the selected dates.");
        setIsAvailable(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
      setIsAvailable(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Check Availability
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Pickers */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Start Date"
              className="w-full border px-3 py-2 rounded"
              minDate={new Date()}
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Select End Date"
              className="w-full border px-3 py-2 rounded"
              minDate={startDate || undefined}
            />
          </div>
        </div>

        {/* Guest Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Guests</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Adults</span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleGuestChange("adult", "decrement")}
                className="px-2 bg-gray-300 rounded"
              >
                -
              </button>
              <span className="px-4">{guests.adult}</span>
              <button
                type="button"
                onClick={() => handleGuestChange("adult", "increment")}
                className="px-2 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-700">Children</span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleGuestChange("child", "decrement")}
                className="px-2 bg-gray-300 rounded"
              >
                -
              </button>
              <span className="px-4">{guests.child}</span>
              <button
                type="button"
                onClick={() => handleGuestChange("child", "increment")}
                className="px-2 bg-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Service Fee */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="serviceFee"
            checked={serviceFee}
            onChange={() => setServiceFee((prev) => !prev)}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="serviceFee" className="ml-2 text-gray-700">
            Add Service Fee (100฿)
          </label>
        </div>

        {/* Total Price */}

        {/* Check Availability Button */}
        {!showResults && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded"
          >
            Check Availability
          </button>
        )}
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Availability Results */}
      {showResults && isAvailable && availability && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Availability Details
          </h2>
          <p>Tour Price: {availability.sale_price}฿</p>
          <p>Max Guests: {availability.max_guests}</p>
          <p>
            Booking Period: {availability.start} - {availability.end}
          </p>
          <div className="text-lg font-semibold text-gray-800 mt-4">
            Total Price: {totalPrice}฿
          </div>
          <div className="flex space-x-4 mt-4">
            <AddToCartButton
              tourId={tourId}
              guests={guests.adult + guests.child}
              serviceFee={serviceFee ? 100 : 0}
              startDate={startDate}
              token={token}
            />
          </div>
        </div>
      )}

      {showResults && !isAvailable && (
        <p className="text-red-500 mt-4">No availability for selected dates.</p>
      )}
    </div>
  );
};

export default CheckAvailabilityForm;
