"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchAllToursByLocation } from "../Api/tourService";
import { FaHeart } from "react-icons/fa";
import Button from "./button"; // Import the Button component

interface ReviewScore {
  score_total: number;
  total_review: number;
}

interface TourCardProps {
  id: number; // Add id here
  title: string;
  price: number;
  sale_price: number;
  discount_percent: string;
  image: string;
  location: string;
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

const locations = [
  { id: null, name: "All Locations" },
  { id: 2, name: "New York" },
  { id: 1, name: "Paris" },
  { id: 3, name: "Tokyo" },
  { id: 4, name: "Dubai" },
];

const TourCard = ({ locationId, setLocationId }: TourCardProps) => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to handle adding tours to the cart
  const handleAddToCart = (tour: Tour) => {
    alert(`${tour.title} has been added to your cart!`);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const locationIdToUse = locationId ?? 0; // Use 0 to fetch all tours
        const data: TourResponse = await fetchAllToursByLocation(
          locationIdToUse
        );

        console.log("API Response:", data); // Debugging API response

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setTours(data.data);
          setError(null);
        } else {
          setTours([]);
          setError("No tours available for this location");
        }
      } catch (err) {
        setError("Failed to fetch tour data");
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [locationId]);

  return (
    <div className="px-5 py-8 lg:px-64">
      {/* Location Tabs */}
      <div className="flex gap-4 mb-6 border-b-2 pb-4">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setLocationId(location.id)}
            className={`px-4 py-2 text-sm font-medium rounded ${
              locationId === location.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>

      {/* Loading/Error/No Tours */}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && tours.length === 0 && !error && (
        <div>No tours available</div>
      )}

      {/* Tour Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="tour-card bg-white shadow-sm rounded-sm overflow-hidden transform transition-transform duration-300 ease-in-out border relative"
          >
            <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
              <FaHeart
                className="text-white hover:text-red-500 transition duration-200"
                size={20}
              />
            </div>

            {/* Link Wrapper */}
            <Link href={`/tour/${tour.id}`}>
              <div>
                {/* Image Section */}
                <div className="relative w-full h-[200px] overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    width={500}
                    height={200}
                    className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>

                {/* Tour Details */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-500">
                    {tour.location?.name || "Unknown Location"}
                  </p>
                  <h3 className="text-xl font-semibold">{tour.title}</h3>
                  <p className="text-gray-600 mt-2">{tour.duration}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-yellow-500">
                      {"★".repeat(Math.round(tour.review_score.score_total))}
                    </span>
                    <span className="ml-1 text-gray-500">
                      ({tour.review_score.total_review} reviews)
                    </span>
                  </div>
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

            {/* Add to Cart Button */}
            {/* <div className="p-4">
              <Button
                onClick={() => handleAddToCart(tour)}
                label="Add to Cart"
                className="w-full mt-4"
              />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCard;
