// components/TourHeader.tsx

import React from "react";

type TourHeaderProps = {
  tourData: {
    title: string;
    location: { name: string };
    price: number;
    sale_price: number;
  };
};

const TourHeader = ({ tourData }: TourHeaderProps) => {
  return (
    <header>
      <h1>{tourData.title}</h1>
      <p>{tourData.location.name}</p>
      <div className="price">
        <span className="original-price">${tourData.price}</span>
        <span className="sale-price">${tourData.sale_price}</span>
      </div>
    </header>
  );
};

export default TourHeader;
