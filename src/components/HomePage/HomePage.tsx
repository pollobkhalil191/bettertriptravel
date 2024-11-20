"use client";

import React from 'react';
import { useState } from "react";
import {
  FaArrowRight,
  FaLeaf,
  FaLandmark,
  FaUtensils,
  FaFutbol,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("nature");

  const tabs = [
    { id: "nature", label: "Nature", icon: <FaLeaf /> },
    { id: "culture", label: "Culture", icon: <FaLandmark /> },
    { id: "food", label: "Food", icon: <FaUtensils /> },
    { id: "sports", label: "Sports", icon: <FaFutbol /> },
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

  return (
    <div className="space-y-10 px-24">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
        <p className="mt-4 text-lg">Find amazing tours, destinations, and experiences.</p>
        <button className="mt-6 inline-flex items-center px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full">
          Learn More <FaArrowRight className="ml-2" />
        </button>
      </section>

      {/* Tab Section */}
      <section>
        <div className="tabs flex justify-center gap-6 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {tourCards
            .filter((card) => card.tab === activeTab)
            .map((card) => (
              <div key={card.id} className="p-6 border rounded-lg shadow">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Sports Slider Section */}
      <section className="space-y-4 px-4">
        <h2 className="text-2xl font-bold text-center">Top sports sights you can't miss</h2>
        <div className="relative">
          <div className="flex items-center overflow-x-scroll scrollbar-hide gap-4">
            {destinations.map((destination) => (
              <div key={destination.id} className="min-w-[250px] flex-shrink-0 rounded-lg shadow">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-40 w-full object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                </div>
              </div>
            ))}
          </div>
          {/* Slider Arrows */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow">
            <FaChevronLeft />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow">
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
              <img
                src={destination.image}
                alt={destination.name}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
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
