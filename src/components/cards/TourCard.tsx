"use client"; // Add this line at the top of the file

import React, { useEffect, useState } from "react";
import apiClient from "../../Utils/apiClients"; // Ensure this is correctly configured
import { HeartIcon } from "@heroicons/react/24/solid"; // Correct path for Heroicons 2.x
import { FaStar } from "react-icons/fa"; // Star icon from react-icons
import Image from "next/image";

// Define the structure of the Tour data
interface Tour {
  id: number;
  title: string;
  image: string;
  location: {
    name: string;
  };
  duration: string;
  review_score: {
    score_total: number;
    total_review: number;
  };
  sale_price: string;
}

const TourCard = () => {
  const [tours, setTours] = useState<Tour[]>([]); // Define state with the correct type
  const [error, setError] = useState<string | null>(null); // State for any errors

  useEffect(() => {
    const fetchTours = async () => {
      let allTours: Tour[] = []; // Declare the type for allTours
      let page = 1; // Initialize page to 1
      let hasMore = true; // Flag to indicate if there are more tours to fetch

      try {
        while (hasMore) {
          // Make the API call with pagination
          const response = await apiClient.get("/tour/search", {
            params: {
              limit: 10, // Set the number of results per page
              page: page, // Add the page number
            },
          });

          console.log("Fetched tours:", response.data);

          const newTours: Tour[] = response.data.data || []; // Safely access the data
          allTours = [...allTours, ...newTours]; // Add the new tours to the list

          // Check if there are more tours to fetch
          hasMore = response.data.meta?.has_more ?? newTours.length > 0;
          page++; // Increment the page for the next request
        }

        console.log("All tours fetched:", allTours);
        setTours(allTours); // Set all tours to state once all pages are fetched
      } catch (err: any) {
        console.error("Error fetching tours:", err.response || err);
        setError("Failed to fetch tours");
      }
    };

    fetchTours();
  }, []); // Empty dependency array to run only once when the component mounts

  // Render error or the list of tours
  if (error) {
    return <div>{error}</div>;
  }

  // Check if there are no tours and display the appropriate message
  if (tours.length === 0) {
    return <div>No tours available.</div>; // Display when no tours are available
  }

  // If there are tours, render the tour cards
  return (
    <div className="tour-cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {tours.map((tour) => (
        <div
          key={tour.id}
          className="tour-card bg-white rounded-lg overflow-hidden cursor-pointer"
        >
          <div className="relative">
            <Image
              width={500} // Adjust width as needed
              height={300} // Set a fixed height for the image
              src={tour.image}
              alt={tour.title}
              className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <HeartIcon className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-300" />
            </div>
          </div>

          <div className="p-4 border-2">
            <p className="text-sm text-gray-500">{tour.location.name}</p>
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{tour.title}</h3> {/* Title with line-clamp */}
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-500">{tour.duration}</p>

              {/* Rating with Star Icons */}
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-yellow-500">
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = tour.review_score.score_total; // Current rating (e.g., 2.5)
                    const isFullStar = index + 1 <= Math.floor(rating); // Full star condition
                    const isHalfStar = index + 1 === Math.floor(rating) + 1 && rating % 1 !== 0; // Half star condition (e.g., 2.5)

                    if (isFullStar) {
                      // Fully filled star
                      return <FaStar key={index} className="inline-block text-yellow-500" />;
                    } else if (isHalfStar) {
                      // Half-filled star
                      return (
                        <FaStar
                          key={index}
                          className="inline-block text-yellow-500"
                          style={{
                            clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", // Half-fill effect
                          }}
                        />
                      );
                    } else {
                      // Empty star
                      return <FaStar key={index} className="inline-block text-gray-300" />;
                    }
                  })}
                </span>
                ({tour.review_score.total_review})
              </p>

              <p className="text-lg font-bold text-primary">
                From <span className="font-semibold">{tour.sale_price}</span>
                <span className="text-sm font-light"> per person</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourCard;
