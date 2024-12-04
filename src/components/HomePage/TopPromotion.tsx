import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

// Define the structure of a tour
interface Tour {
  id: number;
  object_model: string;
  title: string;
  price: string;
  sale_price: string;
  discount_percent: string;
  image: string;
  content: string;
  location: {
    id: number;
    name: string;
  };
  is_featured: number;
  duration: string;
  review_score: {
    score_total: string;
    total_review: number;
  };
}

const TopPromotion: React.FC = () => {
  const [bestPromotions, setBestPromotions] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For showing a loader
  const [error, setError] = useState<string | null>(null); // For showing errors

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://btt.triumphdigital.co.th/api/home-page"); // API endpoint
        const allTours = response.data?.model?.data || []; // Use optional chaining and default to an empty array

        // Filter best promotions (is_featured = 1)
        const featuredTours = allTours.filter((tour: Tour) => tour.is_featured === 1);
        setBestPromotions(featuredTours);
      } catch (err) {
        setError("Failed to fetch tours. Please try again later.");
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-4">Our Best Promotion Tours</h2>
      <p className="text-lg text-center mb-8 text-gray-600">Most popular destinations</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bestPromotions.length > 0 ? (
          bestPromotions.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <Image
        
                className="w-full h-64 object-cover"
                src={tour.image}
                alt={tour.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{tour.title}</h3>
                <p className="text-lg font-bold text-gray-900">
                  {tour.sale_price}{" "}
                  <span className="text-sm line-through text-gray-500">{tour.price}</span>
                </p>
                <p className="text-sm text-green-500">{tour.discount_percent} OFF</p>
                <p className="text-sm text-gray-500 mt-2">{tour.location.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No promotions available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default TopPromotion;
