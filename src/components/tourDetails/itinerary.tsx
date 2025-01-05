"use client";

import React, { useEffect, useState } from "react";
import { fetchTourDetails, TourDetailsResponse } from "../../Api/tourDetails";

interface itinerary {
  image_id: string;
  title: string;
  desc: string;
  content: string;
  image: string;
}

const ItineraryTourDetails = ({ tourId }: { tourId: string }) => {
  const [itinerary, setItinerary] = useState<itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTourDetails = async () => {
      try {
        setLoading(true);
        console.log("Fetching tour details for ID:", tourId);

        const response: TourDetailsResponse = await fetchTourDetails(tourId);
        console.log("API Response:", response);

        setItinerary(response?.data?.itinerary || []); // Extract itinerary
      } catch (err: any) {
        console.error(
          "Error fetching tour details:",
          err?.response?.data || err.message
        );
        setError("Failed to load itinerary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      getTourDetails();
    } else {
      console.error("No tour ID provided.");
      setError("Tour ID is required to fetch itinerary details.");
      setLoading(false);
    }
  }, [tourId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Tour Itinerary</h1>
      <div>
        {itinerary.map((itinerary) => (
          <div key={itinerary.image_id}>
            <h2>{itinerary.title}</h2>
            <p>{itinerary.desc}</p>
            <p>{itinerary.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryTourDetails;
