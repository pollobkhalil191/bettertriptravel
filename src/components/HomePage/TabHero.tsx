import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TabHero = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<any[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get('https://btt.triumphdigital.co.th/api/home-page');
        const listItems = response.data.list_item || [];
        setTabs(listItems);
      } catch (error) {
        console.error('Error fetching tabs data:', error);
      }
    };

    fetchTabs();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="relative w-full h-[400px] sm:h-[500px] bg-cover bg-center"
        style={{ backgroundImage: 'url("https://example.com/hero-image.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold">Discover Your Next Adventure</h1>
            <p className="mt-4 text-lg">Find the perfect tour for your next trip.</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white py-6 mt-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex space-x-6 mb-6">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-lg font-medium py-2 px-4 rounded-md ${
                  activeTab === index ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-xl text-gray-700">{tabs[activeTab]?.desc || 'No description available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabHero;
