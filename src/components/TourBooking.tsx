"use client";

import React, { useState, useEffect } from "react";
import { fetchTourDetails } from "../Api/tourDetails"; // Replace with your actual API function
import CheckAvailabilityForm from "./checkAvailibility";

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
        let newCount = currentCount;
        if (action === "increase" && currentCount < personType.max) {
          newCount = currentCount + 1;
        } else if (action === "decrease" && currentCount > personType.min) {
          newCount = currentCount - 1;
        }
        return { ...prevCounts, [name]: newCount };
      }
      return prevCounts;
    });
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Add price for adults (min 1 adult required)
    const adultCount = Math.max(counts["Adult"] || 0, 1); // Ensure at least 1 adult
    const adultPrice =
      personTypes.find((pt) => pt.name === "Adult")?.price || 0;
    totalPrice += adultCount * adultPrice;

    // Add price for children (if any)
    const childCount = counts["Child"] || 0;
    const childPrice =
      personTypes.find((pt) => pt.name === "Child")?.price || 0;
    totalPrice += childCount * childPrice;

    // Add sale price for base (1 adult)
    totalPrice += salePrice;

    // Add service fee if the checkbox is checked
    // Add service fee if booking fee exists
    if (bookingFee) {
    }

    return totalPrice;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-xl p-6 bg-white shadow-md rounded-md">
      <div>
        <CheckAvailabilityForm tourId={tourId} />
      </div>
      <div className="mt-4">
        {personTypes.map((personType) => (
          <div key={personType.name}>
            <span>{personType.name}</span>
            <button
              onClick={() => handleCountChange(personType.name, "decrease")}
            >
              -
            </button>
            <span>{counts[personType.name]}</span>
            <button
              onClick={() => handleCountChange(personType.name, "increase")}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default TourBookingForm;
