"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAllToursByLocation } from "../../Api/tourService";
import { FaHeart } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion"; // Import framer-motion
import Button from "../button";

interface ReviewScore {
  score_total: number;
  total_review: number;
}

interface Tour {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: number;
  sale_price?: number;
  review_score: ReviewScore;
  location?: {
    name: string;
  };
}

interface TourResponse {
  data: Tour[];
}

const ParisTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParisTours = async () => {
      try {
        const locationIdForParis = 2; // Example location_id for Paris
        const data: TourResponse = await fetchAllToursByLocation(
          locationIdForParis
        );

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setTours(data.data); // Filtered tours for Paris
          setError(null); // Clear any error
        } else {
          setTours([]);
          setError("No tours available for Paris");
        }
      } catch (err) {
        setError("Failed to fetch tour data");
        console.error("Error fetching tours:", err);
      }
    };

    fetchParisTours();
  }, []);

  if (error) return <div>{error}</div>;

  const isSliderActive = tours.length > 4; // Only show slider if there are more than 4 tours

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Slide-in animation for the tour cards
  const slideInAnimation = {
    hidden: { opacity: 0, x: -100 }, // Start from left
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 25,
      },
    },
  };

  function handleAddToCart(tour: Tour): void {
    console.log(`Tour added to cart: ${tour.title}`);
    // Implement the logic to add the tour to the cart
  }

  return (
    <div className="px-4 lg:px-0 py-8">
      <h2 className="text-2xl font-bold mb-6">Explore more in Paris</h2>
      <div className="mb-8">
        {/* React Multi Carousel if there are more than 4 tours */}
        {isSliderActive ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="px-3" // Add gap between cards
          >
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial="hidden"
                animate="show"
                variants={slideInAnimation}
                transition={{ delay: index * 0.1 }} // Stagger the animation
              >
                <Link href={`/tour/${tour.id}`}>
                  <div className="tour-card bg-white shadow-sm rounded-sm overflow-hidden transform transition-transform duration-300 ease-in-out border relative flex flex-col h-full">
                    {/* Favorite Icon */}
                    <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
                      <FaHeart
                        className="text-white hover:text-red-500 transition duration-200"
                        size={20}
                      />
                    </div>

                    {/* Tour Image */}
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        width={500}
                        height={200}
                        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>

                    {/* Tour Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Location */}
                      <p className="text-sm font-medium text-gray-500">
                        {tour.location?.name || "Unknown Location"}
                      </p>

                      {/* Title (One or Two Lines) */}
                      <h3 className="text-xl font-semibold line-clamp-2 mb-2">
                        {tour.title}
                      </h3>

                      {/* Duration */}
                      <p className="text-gray-600">{tour.duration}</p>

                      {/* Reviews */}
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-500">
                          {"★".repeat(
                            Math.round(tour.review_score.score_total)
                          )}
                        </span>
                        <span className="ml-1 text-gray-500">
                          ({tour.review_score.total_review} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-2 items-center">
                        <p className="text-sm text-gray-400 line-through">
                          {tour.sale_price ? `$${tour.price}` : ""}
                        </p>
                        <p className="text-lg font-bold text-textPrimary">
                          From {`$${tour.sale_price || tour.price}`}{" "}
                          <span className="text-sm">per person</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial="hidden"
                animate="show"
                variants={slideInAnimation}
                transition={{ delay: index * 0.1 }} // Stagger the animation
              >
                <Link href={`/tour/${tour.id}`}>
                  <div className="tour-card bg-white shadow-sm rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out border relative flex flex-col h-full">
                    {/* Favorite Icon */}
                    <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
                      <FaHeart
                        className="text-white hover:text-red-500 transition duration-200"
                        size={20}
                      />
                    </div>

                    {/* Tour Image */}
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        width={500}
                        height={200}
                        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>

                    {/* Tour Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Location */}
                      <p className="text-sm font-medium text-gray-500">
                        {tour.location?.name || "Unknown Location"}
                      </p>

                      {/* Title (One or Two Lines) */}
                      <h3 className="text-xl font-semibold line-clamp-2 mb-2">
                        {tour.title}
                      </h3>
                      <Button
                        onClick={() => handleAddToCart(tour)}
                        label="Add to Cart"
                        className="mt-4"
                      />

                      {/* Duration */}
                      <p className="text-gray-600">{tour.duration}</p>

                      {/* Reviews */}
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-500">
                          {"★".repeat(
                            Math.round(tour.review_score.score_total)
                          )}
                        </span>
                        <span className="ml-1 text-gray-500">
                          ({tour.review_score.total_review} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-2 items-center">
                        <p className="text-sm text-gray-400 line-through">
                          {tour.sale_price ? `$${tour.price}` : ""}
                        </p>
                        <p className="text-lg font-bold text-textPrimary">
                          From {`$${tour.sale_price || tour.price}`}{" "}
                          <span className="text-sm">per person</span>
                        </p>
                      </div>
                      {/* Add to Cart Button */}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParisTours;
