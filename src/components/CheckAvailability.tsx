"use client";

import React, { useState, useEffect } from "react";
import { fetchTourDetails } from "../Api/tourDetails"; // Your API function

interface person_types {
  name: string;
  min: number;
  max: number;
  price: number;
  desc: string;
}

const TourBookingForm = ({ tourId }: { tourId: string | number }) => {
  const [person_types, setPersonTypes] = useState<person_types[]>([]); // State for person types
  const [counts, setCounts] = useState<{ [key: string]: number }>({}); // Counts of each person type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tour details and extract person types
  useEffect(() => {
    const getTourDetails = async () => {
      try {
        setLoading(true);
        const tourDetails = await fetchTourDetails(tourId);

        // Map the fetched person_types to numbers for price, min, and max
        const fetchedPersonTypes =
          tourDetails.data.person_types?.map((person_types: person_types) => ({
            ...person_types,
            min: Number(person_types.min),
            max: Number(person_types.max),
            price: Number(person_types.price),
          })) || [];

        setPersonTypes(fetchedPersonTypes);

        // Initialize the counts with the minimum values
        const initialCounts = fetchedPersonTypes.reduce(
          (acc: { [key: string]: number }, person_types) => {
            acc[person_types.name] = person_types.min;
            return acc;
          },
          {}
        );
        setCounts(initialCounts);
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
      const personType = person_types.find((type) => type.name === name); // Use person_types here
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
    return person_types.reduce((total, person_type) => {
      const count = counts[person_type.name] || 0;
      return total + count * person_type.price;
    }, 0);
  };

  // Handle form submission
  const handleSubmit = () => {
    const totalPrice = calculateTotalPrice();
    alert(`Booking successful! Total Price: ${totalPrice}฿`);
  };

  // Loading state
  if (loading) {
    return <div className="text-center p-4">Loading tour details...</div>;
  }

  // Error handling
  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Tour Booking
      </h2>

      {/* Dynamic Person Type Fields */}
      {person_types.length > 0 ? (
        person_types.map((person_type) => (
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
            <p className="text-xs text-gray-500 mt-1">
              {person_type.price}฿ per {person_type.name.toLowerCase()}
            </p>
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
