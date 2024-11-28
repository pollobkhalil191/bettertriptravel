"use client";
import { Metadata } from "next";
import React, { useState, } from "react";
import { FaArrowRight, FaLeaf, FaLandmark, FaUtensils, FaFutbol, } from "react-icons/fa";

import Destination from "./Destination";
import SearchFilter from "../SearchFilter";

export const metadata: Metadata = {
  title: "Home | Better-Trip-Travel",
  description: "Find your perfect adventure with Better-Trip-Travel.",
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("nature");
 
 
  const tabs = [
    { id: "nature", label: "Nature", icon: <FaLeaf />, bg: "https://i.ibb.co/q11VRrt/BM24-HP-DESKTOP-011-right.webp" },
    { id: "culture", label: "Culture", icon: <FaLandmark />, bg: "https://i.ibb.co/n675kkY/BM24-HP-DESKTOP-008.webp" },
    { id: "food", label: "Food", icon: <FaUtensils />, bg: "https://i.ibb.co/QkFYjQG/BCS-2024-Paris-Bakery-Homepage-Desktop.webp" },
    { id: "sports", label: "Sports", icon: <FaFutbol />, bg: "https://i.ibb.co/Jzc9KNH/BM24-Desktop-Oahu.webp" },
  ];

  const tourCards = [
    { id: 1, tab: "nature", title: "Beautiful Forests", description: "Explore the green landscapes." },
    { id: 2, tab: "culture", title: "Historical Monuments", description: "Dive into history." },
    { id: 3, tab: "food", title: "Local Cuisine", description: "Taste unique flavors." },
    { id: 4, tab: "sports", title: "Adventure Sports", description: "Feel the adrenaline." },
  ];

 

  

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative text-white text-center h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${tabs.find((tab) => tab.id === activeTab)?.bg})` }}
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
          <p className="mt-4 text-lg">Find amazing tours, destinations, and experiences.</p>
          <button className="mt-6 inline-flex items-center px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            Learn More <FaArrowRight className="ml-2" />
          </button>
        </div>
        <div className="-mt-14 z-10 left-0 w-full flex justify-center relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-24 py-4 rounded-md text-2xl font-bold ${activeTab === tab.id ? "bg-white text-black" : "text-white"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content Section */}
      <section className="bg-white py-10 px-5 lg:px-20">
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourCards.filter((card) => card.tab === activeTab).map((card) => (
            <div key={card.id} className="p-6 border rounded-md shadow">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

   
            <div>
              


            </div>
            <Destination/>

            <SearchFilter/>
            

          
            

    </div>
  );
}
