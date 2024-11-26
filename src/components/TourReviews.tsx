// components/TourReviews.tsx

import React from "react";

type TourReviewsProps = {
  reviews: { title: string; content: string; author: { name: string } }[];
};

const TourReviews = ({ reviews }: TourReviewsProps) => {
  return (
    <section className="reviews">
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <h4>{review.title}</h4>
          <p>{review.content}</p>
          <p><strong>{review.author.name}</strong></p>
        </div>
      ))}
    </section>
  );
};

export default TourReviews;
