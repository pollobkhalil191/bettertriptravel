"use client";

import React from "react";

interface ItineraryItem {
  id: number;
  title: string;
  description: string;
  duration: string;
}

const itineraryData: ItineraryItem[] = [
  {
    id: 1,
    title: "2 Pickup Location Options",
    description: "Candi Dasa, Bali",
    duration: "",
  },
  { id: 2, title: "Transfer", description: "", duration: "1 hour" },
  { id: 3, title: "Lempuyang Temple", description: "", duration: "1 hour" },
  { id: 4, title: "Tirta Gangga", description: "", duration: "30 minutes" },
  {
    id: 5,
    title: "Tukad Cepung Waterfall",
    description: "Lunch",
    duration: "2 hours",
  },
];

const ItineraryComponent: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Itinerary</h2>

      <div className="space-y-4">
        {itineraryData.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <span className="text-sm text-gray-700">{item.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryComponent;
