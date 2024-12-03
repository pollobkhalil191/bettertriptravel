"use client"; // Add this at the very top of the file

import React from "react";

import Destination from "./Destination";
import TopPromotion from "./TopPromotion";
import TabHero from "./TabHero";







const HomePage: React.FC = () => {
  return (
    <>
    
    <TabHero/>
 
    <TopPromotion/>

      {/* Destination Section */}
      <Destination />

      
    </>
  );
};

export default HomePage;
