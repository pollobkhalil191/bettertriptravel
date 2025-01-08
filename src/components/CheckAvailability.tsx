"use client";

import React, { useState, useEffect } from "react";
import { fetchTourDetails } from "../Api/tourDetails"; // Replace with your actual API function
import CheckAvailabilityForm from "./check";

interface PersonType {
  name: string;
  min: number;
  max: number;
  price: number;
  desc: string;
}

interface BookingFee {
  name: string;
  desc: string;
  price: number;
}

const TourBookingForm = ({ tourId }: { tourId: string | number }) => {
  const [personTypes, setPersonTypes] = useState<PersonType[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [salePrice, setSalePrice] = useState<number>(0);
  const [bookingFee, setBookingFee] = useState<BookingFee | null>(null);
  const [includeFee, setIncludeFee] = useState<boolean>(false); // State for checkbox
  const [selectedDate, setSelectedDate] = useState<string>(""); // Date picker state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tour details and initialize data
  useEffect(() => {
    const getTourDetails = async () => {
      try {
        setLoading(true);
        const tourDetails = await fetchTourDetails(tourId);

        const fetchedPersonTypes =
          tourDetails.data.person_types?.map((person_type: PersonType) => ({
            ...person_type,
            min: Number(person_type.min),
            max: Number(person_type.max),
            price: Number(person_type.price),
          })) || [];

        setPersonTypes(fetchedPersonTypes);

        const initialCounts = fetchedPersonTypes.reduce(
          (acc: { [key: string]: number }, person_type) => {
            acc[person_type.name] = person_type.min; // Minimum count from API
            return acc;
          },
          {}
        );
        setCounts(initialCounts);

        const fetchedSalePrice = tourDetails.data.sale_price || 0;
        setSalePrice(Number(fetchedSalePrice));

        const fetchedBookingFee = tourDetails.data.booking_fee?.[0] || null;
        if (fetchedBookingFee) {
          setBookingFee({
            name: fetchedBookingFee.name,
            desc: fetchedBookingFee.desc,
            price: Number(fetchedBookingFee.price),
          });
        }
      } catch (err) {
        setError("Failed to fetch tour details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTourDetails();
  }, [tourId]);

  // Handle increment and decrement for each person type
  const handleCountChange = (name: string, action: "increase" | "decrease") => {
    setCounts((prevCounts) => {
      const currentCount = prevCounts[name];
      const personType = personTypes.find((type) => type.name === name);
      if (personType) {
        const newCount =
          action === "increase"
            ? Math.min(currentCount + 1, personType.max)
            : Math.max(currentCount - 1, personType.min);
        return { ...prevCounts, [name]: newCount };
      }
      return prevCounts;
    });
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    let totalPrice = salePrice; // Start with the base sale price (for 1 adult)

    // Add 1000฿ for each additional adult
    const adultCount = counts["Adult"] || 0;
    if (adultCount > 1) {
      totalPrice += (adultCount - 1) * 1000; // 1000฿ for each additional adult
    }

    // Add price for children
    const childCount = counts["Child"] || 0;
    if (childCount > 0) {
      const childPrice =
        personTypes.find((pt) => pt.name === "Child")?.price || 0;
      totalPrice += childCount * childPrice;
    }

    // Add service fee if the checkbox is checked
    if (includeFee && bookingFee) {
      totalPrice += bookingFee.price;
    }

    return totalPrice; // Return the calculated total price
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-xl  p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Tour Booking</h1>

      {/* Sale Price */}
      <p className="text-lg font-medium mb-4">{salePrice}฿</p>

      {/* Select Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full mt-2 p-2 border rounded-md"
        />
      </div>

      {/* Person Type Fields */}
      {personTypes.map((person_type) => (
        <div key={person_type.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {person_type.name} ({person_type.desc})
          </label>
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => handleCountChange(person_type.name, "decrease")}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              -
            </button>
            <span>{counts[person_type.name]}</span>
            <button
              onClick={() => handleCountChange(person_type.name, "increase")}
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {person_type.price}฿ per {person_type.name.toLowerCase()}
          </p>
        </div>
      ))}

      {/* Service Fee Checkbox */}
      {bookingFee && (
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeFee}
              onChange={(e) => setIncludeFee(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              {bookingFee.name} (+{bookingFee.price}฿)
            </span>
          </label>
          <p className="text-xs text-gray-500">{bookingFee.desc}</p>
        </div>
      )}

      {/* Total Price */}
      <div className="mt-6">
        <p className="text-lg font-medium">
          Total Price: {calculateTotalPrice()}฿
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={() =>
          alert(`Booking successful! Total price: ${calculateTotalPrice()}฿`)
        }
        className="w-full mt-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
      >
        Book Now
      </button>

      <div>
        <CheckAvailabilityForm />
      </div>
    </div>
  );
};

export default TourBookingForm;
