"use client"; // Add this at the very top of the file

import React from "react";

import Destination from "./Destination";
import TopPromotion from "./TopPromotion";
import TabHero from "./TabHero";
import ParisTours from "./ParisTours";







const HomePage: React.FC = () => {
  return (
    <>
    
    <TabHero/>
 
    <TopPromotion/>

    <div className=" lg:px-16">
      <ParisTours/>
    </div>
    

      {/* Destination Section */}
      <Destination />

      
    </>
  );
};

export default HomePage;
