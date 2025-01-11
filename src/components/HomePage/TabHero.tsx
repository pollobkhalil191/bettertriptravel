"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAllToursByLocation } from "../../Api/tourService";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import carousel styles

interface Location {
  id: number;
  title: string;
  sub_title: string;
  image: string;
}

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

interface TourCardProps {
  locationId: number | null;
  setLocationId: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function TourCard({ locationId, setLocationId }: TourCardProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://btt.triumphdigital.co.th/api/locations"
        );
        const locationData = await response.json();
        const fetchedLocations = locationData.data || [];
        setLocations(fetchedLocations);

        if (fetchedLocations.length > 0 && locationId === null) {
          setLocationId(fetchedLocations[0].id);
        }

        const locationIdToUse = locationId ?? fetchedLocations[0]?.id ?? 0;
        const tourResponse: TourResponse = await fetchAllToursByLocation(
          locationIdToUse
        );

        if (
          tourResponse?.data &&
          Array.isArray(tourResponse.data) &&
          tourResponse.data.length > 0
        ) {
          setTours(tourResponse.data);
          setError(null);
        } else {
          setTours([]);
          setError("No tours available for this location");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching tours:", err);
      }
    };

    fetchData();
  }, [locationId]);

  const currentLocationImage = locations.find(
    (loc) => loc.id === locationId
  )?.image;

  // Carousel settings for react-multi-carousel
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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <div className="relative mb-12 w-full h-[60vh]">
        {currentLocationImage ? (
          <>
            {/* Smoothly Fading Hero Image */}
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0 }} // Start invisible
              animate={{ opacity: 1 }} // Fade in smoothly
              transition={{ duration: 1.5 }} // Duration of the fade-in (1.5s)
            >
              <Image
                src={currentLocationImage}
                alt="Hero Image"
                width={1600}
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Black Gradient at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </>
        ) : null}
      </div>

      {/* Location Selector */}
      <div className="flex justify-center items-center -mt-28 px-10 md:px-10 lg:px-64 mb-8 w-full">
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="w-full px-64"
        >
          {locations.map((location) => (
            <SwiperSlide key={location.id}>
              <button
                onClick={() => setLocationId(location.id)}
                className={`w-full py-5 px-16 rounded-lg text-center flex justify-center font-bold text-2xl ${
                  locationId === location.id
                    ? "bg-white text-primary"
                    : "text-white"
                }`}
              >
                {location.title}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Tours Section */}
      {error ? (
        <div className="text-center text-lg lg:px-64 text-red-600">{error}</div>
      ) : tours.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          No tours available for the selected location
        </div>
      ) : (
        <div className="w-full px-6 md:px-10 lg:px-64">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="px-3"
          >
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ x: -100, opacity: 0 }} // Start off-screen
                animate={{ x: 0, opacity: 1 }} // Animate into position
                transition={{
                  delay: index * 0.2, // Stagger effect
                  duration: 0.6,
                  type: "spring",
                  stiffness: 50,
                }}
              >
                <Link href={`/tour/${tour.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden border relative w-full">
                    <div className="absolute top-2 right-2 z-10 p-2 rounded-full shadow cursor-pointer">
                      <FaHeart
                        className="text-white hover:text-red-500 transition"
                        size={20}
                      />
                    </div>
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      width={1600}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {tour.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {tour.location?.name || "Unknown Location"}
                      </p>
                      <p className="text-gray-600 mt-2">{tour.duration}</p>
                      <div className="flex items-center mt-3">
                        <span className="text-yellow-500">
                          {"★".repeat(
                            Math.round(tour.review_score.score_total)
                          )}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({tour.review_score.total_review} reviews)
                        </span>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-400 line-through">
                          {tour.sale_price ? `$${tour.price}` : ""}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          From ${tour.sale_price || tour.price}{" "}
                          <span className="text-sm">per person</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
