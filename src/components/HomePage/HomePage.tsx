"use client"; // Ensure this is at the top for Next.js Client Component

import React, { useState } from "react";

import Destination from "./Destination";
import TopPromotion from "./TopPromotion";
import TabHero from "./TabHero";
import ParisTours from "./ParisTours";


const HomePage = () => {
  // Define state for locationId
  const [locationId, setLocationId] = useState<number | null>(null);

  return (
    <>
     

      {/* Tour Card Section */}
      <div className="">

      <TabHero locationId={locationId} setLocationId={setLocationId} />
      </div>

      {/* Top Promotion Section */}
      <TopPromotion />

      {/* Paris Tours Section */}
      <div className="lg:px-16">
        <ParisTours />
      </div>

      {/* Destination Section */}
      <Destination />
    </>
  );
};

export default HomePage;
