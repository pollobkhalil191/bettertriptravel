// components/TourItinerary.tsx

import Image from "next/image";
import React from "react";

type TourItineraryProps = {
  itinerary: { title: string; desc: string; image: string }[];
};

const TourItinerary = ({ itinerary }: TourItineraryProps) => {
  return (
    <section className="itinerary">
      {itinerary.map((day, index) => (
        <div key={index} className="itinerary-day">
          <h3>{day.title}</h3>
          <p>{day.desc}</p>
          <Image src={day.image} alt={day.title} />
        </div>
      ))}
    </section>
  );
};

export default TourItinerary;
