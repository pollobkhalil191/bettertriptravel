"use client";

import React, { useEffect, useState } from "react";
import { fetchTourDetails, TourDetailsResponse } from "../../Api/tourDetails";
import Image from "next/image";

interface Itinerary {
  image_id: string;
  title: string;
  desc: string;
  content: string;
  image: string;
}

const ItineraryTourDetails = ({ tourId }: { tourId: string }) => {
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTourDetails = async () => {
      try {
        setLoading(true);
        const response: TourDetailsResponse = await fetchTourDetails(tourId);
        setItinerary(response?.data?.itinerary || []);
      } catch (err: any) {
        setError("Failed to load itinerary. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      getTourDetails();
    } else {
      setError("Tour ID is required to fetch itinerary details.");
      setLoading(false);
    }
  }, [tourId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Loading itinerary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium">Error: {error}</div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-start text-gray-800 mb-8">
        Itinerary
      </h1>
      <div className="relative border-l border-gray-300 pl-8">
        {itinerary.map((item, index) => (
          <div
            key={item.image_id}
            className="mb-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
          >
            {/* Timeline Marker */}
            <div className="absolute -left-5 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-semibold">{index + 1}</span>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base  text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 w-5/12 text-sm sm:text-base mt-2">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryTourDetails;
