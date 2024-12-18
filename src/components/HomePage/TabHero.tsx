"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchToursByLocation } from "../../Api/tourService";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Correct import for Navigation
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion"; // Import motion from Framer Motion

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
        const response = await fetch("https://btt.triumphdigital.co.th/api/locations");
        const locationData = await response.json();
        const fetchedLocations = locationData.data || [];
        setLocations(fetchedLocations);

        if (fetchedLocations.length > 0 && locationId === null) {
          setLocationId(fetchedLocations[0].id);
        }

        const locationIdToUse = locationId ?? fetchedLocations[0]?.id ?? 0;
        const tourResponse: TourResponse = await fetchToursByLocation(locationIdToUse);

        if (tourResponse?.data && Array.isArray(tourResponse.data) && tourResponse.data.length > 0) {
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

  const currentLocationImage = locations.find((loc) => loc.id === locationId)?.image;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Enhanced Animation */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, y: -50 }} // Start off-screen
        animate={{ opacity: 1, y: 0 }} // Animate to original position
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {currentLocationImage ? (
          <Image
            src={currentLocationImage}
            alt="Hero Image"
            width={1600}
            height={600}
            className="w-full h-[80vh] object-cover"
          />
        ) : null}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-5xl font-gt-easti font-bold">Discover Your Next Adventure</h1>
          <p className="text-lg font-gt-easti mt-4">Explore amazing destinations worldwide</p>
          
        </div>
      </motion.div>

      {/* Location Selector with Animated Swiping Effect */}
      <motion.div
        className="flex justify-center items-center -mt-28 px-6 md:px-10 lg:px-16 mb-8"
        initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and move from below
        animate={{ opacity: 1, y: 0 }} // Fade in and slide to original position
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          className="w-full"
        >
          {locations.map((location) => (
            <SwiperSlide key={location.id}>
              <motion.button
                onClick={() => setLocationId(location.id)}
                className={`px-4 py-5 rounded-lg transition-all text-center font-bold text-2xl w-full ${
                  locationId === location.id
                    ? "bg-white text-primary border-blue-700"
                    : "text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {location.title}
              </motion.button>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Tours Section with Enhanced Animations and Hover Effects */}
      {error ? (
        <motion.div
          className="text-center text-lg text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {error}
        </motion.div>
      ) : tours.length === 0 ? (
        <motion.div
          className="text-center text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          No tours available for the selected location
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 md:px-10 lg:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {tours.map((tour) => (
            <Link href={`/tour/${tour.id}`} key={tour.id}>
              <motion.div
                className="bg-white rounded-lg overflow-hidden border transition-transform transform relative w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute top-2 right-2 z-10 p-2 rounded-full shadow cursor-pointer">
                  <FaHeart className="text-white hover:text-red-500 transition" size={20} />
                </div>
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={1600}
                  height={600}
                  className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{tour.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {tour.location?.name || "Unknown Location"}
                  </p>
                  <p className="text-gray-600 mt-2">{tour.duration}</p>
                  <div className="flex items-center mt-3">
                    <span className="text-yellow-500">
                      {"★".repeat(Math.round(tour.review_score.score_total))}
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
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
