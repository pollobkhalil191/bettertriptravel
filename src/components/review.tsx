"use client";

import React, { useEffect, useState } from "react";
import { fetchTourDetails, TourDetailsResponse } from "../Api/tourDetails";

interface ReviewComponentProps {
  tourId: string;
}

const ReviewComponent: React.FC<ReviewComponentProps> = ({ tourId }) => {
  const [tourDetails, setTourDetails] = useState<TourDetailsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const getTourDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchTourDetails(tourId);
        setTourDetails(data);
      } catch (err) {
        setError("Failed to fetch tour details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTourDetails();
  }, [tourId]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  const { review_lists } = tourDetails?.data || {};
  const reviewData = review_lists?.data || [];

  // Only display the first two reviews initially
  const initialReviews = reviewData.slice(0, 2);

  return (
    <div className="bg-white rounded-lg p-6 ">
      <h2 className="text-2xl font-semibold mb-4">
        Highlighted reviews from other travelers
      </h2>

      {/* Initial Reviews */}
      <div className="lg:flex lg:gap-4 flex-wrap">
        {initialReviews.map((review) => {
          const authorName = review.author?.name || "Anonymous";
          const authorInitial = authorName[0]?.toUpperCase() || "A";
          const country = review.author?.country || "";

          return (
            <div
              key={review.id}
              className="p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4 mb-4 lg:mb-0"
              style={{ width: "100%", maxWidth: "385px", height: "180px" }}
            >
              {/* Author's Initial in Circle */}
              <div className="w-12 h-12 bg-blue-500 shadow-sm text-white flex items-center justify-center rounded-full font-semibold text-lg">
                {authorInitial}
              </div>

              {/* Review Details */}
              <div className="flex-1">
                {/* Review Stars */}
                <div className="mt-1">
                  <span className="text-yellow-500">
                    {"★".repeat(review.rate_number)}
                    {"☆".repeat(5 - review.rate_number)}
                  </span>
                </div>
                {/* Author Name and Country */}
                <h4 className="font-semibold text-lg">
                  {authorName} — {country}
                </h4>

                {/* Review Date */}
                <p className="text-sm text-gray-600">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>

                {/* Review Content */}
                <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                  {review.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review More Button */}
      {reviewData.length > 2 && (
        <button
          onClick={() => setShowPopup(true)}
          className="mt-4 text-blue-500 hover:underline"
        >
          See more reviews
        </button>
      )}

      {/* Popup with Additional Reviews */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-xl font-semibold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">All Reviews</h3>

            {/* All Reviews */}
            <div className="space-y-4 max-h-96 overflow-auto">
              {reviewData.slice(2).map((review) => {
                const authorName = review.author?.name || "Anonymous";
                const authorInitial = authorName[0]?.toUpperCase() || "A";

                return (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-center space-x-4"
                  >
                    {/* Author's Initial in Circle */}
                    <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold text-lg">
                      {authorInitial}
                    </div>

                    {/* Review Details */}
                    <div className="flex-1">
                      {/* Review Stars */}
                      <div className="mt-1">
                        <span className="text-yellow-500">
                          {"★".repeat(review.rate_number)}
                          {"☆".repeat(5 - review.rate_number)}
                        </span>
                      </div>
                      {/* Author Name */}
                      <h4 className="font-semibold text-lg">{authorName}</h4>

                      {/* Review Date */}
                      <p className="text-sm text-gray-600">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>

                      {/* Review Content */}
                      <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                        {review.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
