"use client";

import React, { useState, useRef } from "react";
import { FaArrowRight, FaLeaf, FaLandmark, FaUtensils, FaFutbol, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("nature");
  const sliderRef = useRef<HTMLDivElement>(null);
 
 
  // Tabs with dynamic hero backgrounds
  const tabs = [
    { id: "nature", label: "Nature", icon: <FaLeaf />, bg: "https://i.ibb.co.com/q11VRrt/BM24-HP-DESKTOP-011-right.webp/BM24-HP-DESKTOP-011-right.webp" },
    { id: "culture", label: "Culture", icon: <FaLandmark />, bg: " https://i.ibb.co.com/n675kkY/BM24-HP-DESKTOP-008.webp" },
    { id: "food", label: "Food", icon: <FaUtensils />, bg: "https://i.ibb.co.com/QkFYjQG/BCS-2024-Paris-Bakery-Homepage-Desktop.webp " },
    { id: "sports", label: "Sports", icon: <FaFutbol />, bg: "https://i.ibb.co.com/Jzc9KNH/BM24-Desktop-Oahu.webp" },
  ];

  const tourCards = [
    { id: 1, tab: "nature", title: "Beautiful Forests", description: "Explore the green landscapes." },
    { id: 2, tab: "culture", title: "Historical Monuments", description: "Dive into history." },
    { id: 3, tab: "food", title: "Local Cuisine", description: "Taste unique flavors." },
    { id: 4, tab: "sports", title: "Adventure Sports", description: "Feel the adrenaline." },
  ];

  const destinations = [
    { id: 1, name: "Wembley Stadium", image: "/wembley.jpg" },
    { id: 2, name: "Camp Nou", image: "/campnou.jpg" },
    { id: 3, name: "Yankee Stadium", image: "/yankee.jpg" },
  ];

  const aweInspiringDestinations = [
    { id: 1, name: "Alps", image: "/alps.jpg" },
    { id: 2, name: "Maldives", image: "/maldives.jpg" },
    { id: 3, name: "Mount Fuji", image: "/fuji.jpg" },
  ];

  const handleSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative  text-white text-center h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${tabs.find((tab) => tab.id === activeTab)?.bg})` }} // Dynamically change the hero background
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative  flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
          <p className="mt-4 text-lg">Find amazing tours, destinations, and experiences.</p>
          <button className="mt-6 inline-flex items-center px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            Learn More <FaArrowRight className="ml-2" />
          </button>
        </div>
        <div className="-mt-14 z-10 left-0 w-full flex justify-center  relative">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center  px-24 py-4 rounded-md text-2xl font-bold  ${
        activeTab === tab.id ? "bg-white text-black" : " text-white"
      }`}
    >
      {tab.icon} {tab.label}
    </button>
  ))}
</div>

      </section>

      {/* Tab Content Section */}
      <section className="bg-white    py-10 px-5 lg:px-20">
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourCards
            .filter((card) => card.tab === activeTab)
            .map((card) => (
              <div key={card.id} className="p-6 border rounded-md shadow">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Sports Slider Section */}
      <section className="space-y-4 px-4">
        <h2 className="text-2xl font-bold text-center">Top sports sights you cant miss</h2>
        <div className="relative">
          <div ref={sliderRef} className="flex items-center overflow-x-scroll scrollbar-hide gap-4">
            {destinations.map((destination) => (
              <div key={destination.id} className="min-w-[250px] flex-shrink-0 rounded-lg shadow">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={300}
                  height={200}
                  layout="responsive"
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSlider("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => handleSlider("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Awe-Inspiring Section */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-center">Awe-inspiring sports around the world</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {aweInspiringDestinations.map((destination) => (
            <div
              key={destination.id}
              className="relative group overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                width={400}
                height={300}
                layout="responsive"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-lg font-bold text-white">{destination.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
