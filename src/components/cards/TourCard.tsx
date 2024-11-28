// components/TourCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";

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
    score_total: number; // Rating score out of 5
    total_review: number; // Number of reviews
  };
  sale_price: string;
}

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { score_total, total_review } = tour.review_score;
  const maxRating = 5;

  // Generate stars for the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        i <= score_total ? (
          <FaStar key={i} className="text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  return (
    <Link href={`/tour/${tour.id}`} key={tour.id}>
      <div className="tour-card bg-white rounded-lg overflow-hidden cursor-pointer shadow-md transition-transform duration-300 hover:scale-105">
        <div className="relative">
          <Image
            width={500}
            height={300}
            src={tour.image}
            alt={tour.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4 border-t">
          <p className="text-sm text-gray-500">
            <Link
              href={`/Tours?location_id=${tour.location.id}`}
              className="text-blue-500 hover:underline"
            >
              {tour.location.name}
            </Link>
          </p>
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{tour.title}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-500">{tour.duration}</p>
            <div className="flex items-center space-x-1">
              {renderStars()} {/* Display rating stars */}
              <span className="text-sm text-gray-600 ml-1">({total_review})</span>
            </div>
            <p className="text-lg font-bold text-primary">
              From <span className="font-semibold">{tour.sale_price}</span>
              <span className="text-sm font-light"> per person</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
