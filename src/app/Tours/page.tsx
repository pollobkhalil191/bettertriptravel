// Add this at the very top of your file
"use client";

import React, { useState, useEffect } from "react";
import apiClient from "../../Utils/apiClients";
import Filter from "../../components/Filter";
import TourCard from "../../components/cards/TourCard";

interface Tour {
  id: number;
  title: string;
  image: string;
  location: {
    id: number;
    name: string;
  };
  duration: string;
  review_score: {
    score_total: number;
    total_review: number;
  };
  sale_price: string;
}

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    price: "",
    language: "",
    duration: "",
    time: "",
  });
  const [sort, setSort] = useState<string>("recommended");
  const [filterPopup, setFilterPopup] = useState<boolean>(false);

  // Set destinationId from URL if present
  useEffect(() => {
    const destinationQuery = new URLSearchParams(window.location.search).get("location_id");
    if (destinationQuery) {
      setDestinationId(destinationQuery); // Destination-specific URL
    } else {
      setDestinationId(null); // No location_id, show all tours
    }
  }, []);

  // Fetch tours based on destinationId or show all tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        let allTours: Tour[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const response = await apiClient.get("/tour/search", {
            params: {
              location_id: destinationId || "", // Pass empty string if no destinationId
              limit: 10,
              page: page,
            },
          });

          const newTours: Tour[] = response.data.data || [];
          allTours = [...allTours, ...newTours];

          hasMore = response.data.meta?.has_more ?? newTours.length > 0;
          page++;
        }

        setTours(allTours);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching tours:", err.message);
          setError("Failed to fetch tours");
        } else {
          console.error("Unexpected error:", err);
          setError("Failed to fetch tours");
        }
      }
    };

    fetchTours();
  }, [destinationId]); // Fetch tours whenever destinationId changes

  // Filter tours based on selected filters (price, language, duration, time)
  const filteredTours = tours.filter((tour) => {
    const matchesPrice = filters.price ? tour.sale_price === filters.price : true;
    const matchesLanguage = filters.language ? tour.title.includes(filters.language) : true;
    const matchesDuration = filters.duration ? tour.duration.includes(filters.duration) : true;
    const matchesTime = filters.time ? tour.duration.includes(filters.time) : true;

    return matchesPrice && matchesLanguage && matchesDuration && matchesTime;
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 lg:px-14 lg:py-14">
      <Filter
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
        setFilterPopup={setFilterPopup}
      />

      <div className="mb-4 text-gray-700">
        <span className="font-semibold">{filteredTours.length}</span> Tours Found
      </div>

      {filterPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[645px] h-[530px]">
            <h2 className="text-lg font-bold mb-4">Filter Options</h2>
            <button
              onClick={() => setFilterPopup(false)}
              className="mt-4 p-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Tours;
