import React, { useEffect, useState } from "react";
import apiClient from "../../Utils/apiClients"; // Ensure this is correctly configured
import { HeartIcon } from '@heroicons/react/24/solid'; // Correct path for Heroicons 2.x
import { FaStar } from 'react-icons/fa'; // Star icon from react-icons
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
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State for any errors

  useEffect(() => {
    const fetchTours = async () => {
      let allTours: Tour[] = []; // Declare the type for allTours
      let page = 1; // Initialize page to 1
      let hasMore = true;
    
      try {
        while (hasMore) {
          // Make the API call with pagination
          const response = await apiClient.get("/tour/search", {
            params: { service_name: "tour", page: page }, // Correctly add pagination params
          });

          console.log("Fetched tours:", response.data);

          const newTours: Tour[] = response.data.data || []; // Safely access data
          allTours = [...allTours, ...newTours]; // Add the new tours to the list
    
          // Check if there are more tours to fetch
          hasMore = response.data.meta?.has_more ?? false; // Ensure fallback if meta or has_more is undefined
          page++; // Increment page for the next request
        }
    
        console.log("All tours fetched:", allTours);
        setTours(allTours); // Set all tours to state once all pages are fetched
        setLoading(false); // Data fetched, stop loading
      } catch (err: any) {
        console.error("Error fetching tours:", err.response || err);
        setError("Failed to fetch tours");
        setLoading(false); // Error occurred, stop loading
      }
    };

    fetchTours();
  }, []); // Empty dependency array to run only once when the component mounts

  // Render loading, error, or the list of tours
  if (loading) {
    return <div>Loading tours...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tour-cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {tours.length === 0 ? (
        <div>No tours available.</div>
      ) : (
        tours.map((tour) => (
          <div
            key={tour.id}
            className="tour-card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="relative">
              <Image
                width={500} // You can adjust this width as needed
                height={300} // Set a fixed height for the image
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110" 
              />
              <div className="absolute top-2 right-2">
                <HeartIcon className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-300" />
              </div>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500">{tour.location.name}</p>
              <h3 className="text-xl font-semibold text-gray-800">{tour.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">{tour.duration}</p>
                
                {/* Rating with Star Icons */}
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-yellow-500">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaStar
                        key={index}
                        className={`inline-block ${index < tour.review_score.score_total ? 'text-yellow-500' : 'text-gray-300'}`} 
                      />
                    ))}
                  </span> 
                  ({tour.review_score.total_review})
                </p>
                <p className="text-lg font-bold text-primary">
                  From <span className="font-semibold">{tour.sale_price}</span> 
                  <span className="text-sm font-light">per person</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TourCard;
