"use client";

import React, { useState, useEffect } from "react";
import { fetchTourDetails } from "../Api/tourDetails"; // Your API function

interface PersonType {
  name: string;
  min: number;
  max: number;
  price: number;
  desc: string;
}

const TourBookingForm = ({ tourId }: { tourId: string | number }) => {
  const [personTypes, setPersonTypes] = useState<PersonType[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [name, setName] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(""); // Date selection
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [salePrice, setSalePrice] = useState<number>(0); // Sale price fetched from API

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
            acc[person_type.name] =
              person_type.name === "Adult" ? 1 : person_type.min; // Default 1 adult
            return acc;
          },
          {}
        );
        setCounts(initialCounts);

        const fetchedSalePrice = tourDetails.data.sale_price || 0;
        setSalePrice(Number(fetchedSalePrice));
      } catch (err) {
        setError("Failed to fetch tour details. Please try again later.");
        console.error("Error fetching tour details:", err);
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
    let totalPrice = salePrice;

    // Check for "Adult" person type and add 1,000 for each additional adult beyond the first
    const adultCount = counts["Adult"] || 0;
    if (adultCount > 1) {
      totalPrice += (adultCount - 1) * 1000; // Add 1,000 for each extra adult
    }

    return Math.round(totalPrice);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    const totalPrice = calculateTotalPrice();
    alert(
      `Booking successful! \nName: ${name}\nDate: ${selectedDate}\nTotal Price: ${totalPrice}฿`
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading tour details...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div id="2" className="max-w-xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 lg:text-start">
        Tour Booking
      </h2>

      {/* Initial Sale Price */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">
          Sale Price: {salePrice}฿
        </p>
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter your name"
        />
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Dynamic Person Type Fields */}
      {personTypes.length > 0 ? (
        personTypes.map((person_type) => (
          <div key={person_type.name} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {person_type.name} ({person_type.desc})
            </label>
            <div className="flex items-center justify-between p-3 border rounded-md bg-gray-100">
              <button
                onClick={() => handleCountChange(person_type.name, "decrease")}
                className="px-3 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              >
                -
              </button>
              <span className="text-lg">{counts[person_type.name]}</span>
              <button
                onClick={() => handleCountChange(person_type.name, "increase")}
                className="px-3 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              >
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center p-4">
          <p className="text-gray-500">
            No person types available for this tour.
          </p>
        </div>
      )}

      {/* Total Price */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">
          Total Price: {calculateTotalPrice()}฿
        </p>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
};

export default TourBookingForm;
