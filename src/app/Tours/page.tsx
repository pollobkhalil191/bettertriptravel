"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../Utils/apiClients";
import { HeartIcon } from "@heroicons/react/24/solid";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

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
  const [destinationId, setDestinationId] = useState<string | null>(null); // Keep track of the destination filter

  useEffect(() => {
    // Extract location_id from the URL query params
    const destinationQuery = new URLSearchParams(window.location.search).get('location_id');
    if (destinationQuery) {
      setDestinationId(destinationQuery); // If present, set the destination filter
    }
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      let allTours: Tour[] = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await apiClient.get("/tour/search", {
            params: {
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
      } catch (err: any) {
        console.error("Error fetching tours:", err.response || err);
        setError("Failed to fetch tours");
      }
    };

    fetchTours();
  }, []);

  // Filter the tours based on destinationId if it's set
  const filteredTours = destinationId
    ? tours.filter((tour) => tour.location.id.toString() === destinationId)
    : tours;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tour-cards-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {filteredTours.map((tour) => (
        <motion.div
          key={tour.id}
          className="tour-card bg-white rounded-lg overflow-hidden cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }} // Initial state (hidden and smaller)
          animate={{ opacity: 1, scale: 1 }}   // Final state (visible and normal size)
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
        >
          <div className="relative">
            <Image
              width={500}
              height={300}
              src={tour.image}
              alt={tour.title}
              className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute top-2 right-2">
              <HeartIcon className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-300" />
            </div>
          </div>

          <div className="p-4 border-2">
            <p className="text-sm text-gray-500">
              <a
                href={`/Tours?location_id=${tour.location.id}`} // Link with location_id
                className="text-blue-500 hover:underline"
              >
                {tour.location.name}
              </a>
            </p>
            <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{tour.title}</h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-500">{tour.duration}</p>

              <p className="text-sm text-gray-500">
                <span className="font-semibold text-yellow-500">
                  {Array.from({ length: 5 }, (_, index) => {
                    const rating = tour.review_score.score_total;
                    const isFullStar = index + 1 <= Math.floor(rating);
                    const isHalfStar =
                      index + 1 === Math.floor(rating) + 1 && rating % 1 !== 0;

                    if (isFullStar) {
                      return <FaStar key={index} className="inline-block text-yellow-500" />;
                    } else if (isHalfStar) {
                      return (
                        <FaStar
                          key={index}
                          className="inline-block text-yellow-500"
                          style={{
                            clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                          }}
                        />
                      );
                    } else {
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
        </motion.div>
      ))}
    </div>
  );
};

export default Tours;
