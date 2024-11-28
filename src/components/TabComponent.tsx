"use client";
import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
}

interface TourCard {
  id: number;
  tab: string;
  title: string;
  description: string;
}

interface TabComponentProps {
  tabs: Tab[];
  tourCards: TourCard[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs, tourCards }) => {
  const [activeTab, setActiveTab] = useState("nature");

  return (
    <div>
      {/* Tabs Section */}
      <section
        className="relative text-white text-center h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${tabs.find((tab) => tab.id === activeTab)?.bg})` }}
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl font-bold">Discover Your Next Adventure</h1>
          <p className="mt-4 text-lg">Find amazing tours, destinations, and experiences.</p>
        </div>
        <div className="-mt-14 z-10 left-0 w-full flex justify-center relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-24 py-4 rounded-md text-2xl font-bold ${
                activeTab === tab.id ? "bg-white text-black" : "text-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content Section */}
      <section className="bg-white py-10 px-5 lg:px-20">
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
    </div>
  );
};

export default TabComponent;
