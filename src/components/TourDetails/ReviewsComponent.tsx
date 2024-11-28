import React from "react";

interface ReviewsComponentProps {
  reviews?: string[];  // Expecting an array of review strings or undefined
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  return (
    <div>
      {reviews && reviews.length > 0 ? (
        <div>
          <h3>Reviews</h3>
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default ReviewsComponent;
