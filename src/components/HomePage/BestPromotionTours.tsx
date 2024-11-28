import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";

// Define the types for the tour data and filters
interface Tour {
  id: number;
  title: string;
  image: string;
  location: {
    name: string;
  };
  sale_price: number | null;
  duration: string;
  review_score: {
    score_total: number;
    total_review: number;
  };
}

interface Filter {
  id: number;
  name: string;
}

interface Filters {
  locations: Filter[];
}

const BestPromotionTours = () => {
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<string | null>("1");
  const [filters, setFilters] = useState<Filters | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://btt.triumphdigital.co.th/api/home-page");

        console.log("API Response:", response.data); // Log the entire API response for debugging

        if (response.data?.data) {
          const data: Tour[] = response.data?.data;
          setFilteredTours(data); // Set the tours in filteredTours

          const filtersResponse = await axios.get("https://btt.triumphdigital.co.th/api/tour/filters");
          setFilters(filtersResponse.data as Filters); // Set filters (locations)
        } else {
          setError("No data returned from the API.");
        }
      } catch (err) {
        // Check if error is an AxiosError
        if (err instanceof AxiosError) {
          setError(err?.response?.data?.message || "Failed to fetch tours.");
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [locationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 lg:px-14 lg:py-14">
      <div className="text-2xl font-bold mb-4">Our Best Promotion Tours</div>

      {/* Location dropdown to change location */}
      <div className="mb-4">
        <select
          value={locationId || ""}
          onChange={(e) => setLocationId(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Location</option>
          {filters?.locations?.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      {/* Displaying filtered tours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTours.slice(0, 6).map((tour) => (
          <div key={tour.id} className="tour-card border rounded-lg p-4 shadow-md">
            {/* Ensure image exists, fallback if not */}
            <Image
              src={tour.image || "https://via.placeholder.com/150"}
              alt={tour.title || "Tour Image"}
              className="w-full h-56 object-cover rounded-t-lg"
              width={400}
              height={300}
            />
            <h3 className="text-xl font-semibold mt-4">{tour.title || "Tour Title"}</h3>
            <p className="text-sm text-gray-600">
              {tour.location?.name || "Location not available"}
            </p>
            <p className="text-lg font-bold text-red-600">
              {tour.sale_price ? `$${tour.sale_price}` : "Price not available"}
            </p>
            <p className="text-sm text-gray-500">
              {tour.duration || "Duration not available"}
            </p>
            <div className="mt-2 flex items-center">
              <span className="text-yellow-400">
                {tour.review_score?.score_total || "No rating"}
              </span>
              <span className="ml-2 text-sm">
                {tour.review_score?.total_review
                  ? `${tour.review_score.total_review} reviews`
                  : "No reviews"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestPromotionTours;
