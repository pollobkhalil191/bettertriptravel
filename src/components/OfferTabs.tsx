import React, { useState } from 'react';

interface Offer {
  _active: boolean;
  title: string;
  desc: string;
  background_image_url: string;
  link_title: string;
  link_more: string;
  featured_text?: string;
  featured_icon?: string;
}

interface OfferTabsProps {
  offers: Offer[];
}

const OfferTabs: React.FC<OfferTabsProps> = ({ offers }) => {
  const [activeTab, setActiveTab] = useState<number>(0); // To track the active tab

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="offer-tabs container mx-auto py-8">
      {/* Tab Buttons */}
      <div className="tabs flex space-x-4 mb-4">
        {offers.map((offer, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`${
              activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            } py-2 px-4 rounded-lg transition-all duration-300`}
          >
            {offer.title}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="tab-content">
        <div
          className="tab-description p-4 rounded-lg"
          style={{
            backgroundImage: `url(${offers[activeTab]?.background_image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h3 className="text-xl font-bold">{offers[activeTab]?.title}</h3>
          <p className="mt-2">{offers[activeTab]?.desc}</p>
          <a
            href={offers[activeTab]?.link_more}
            className="text-blue-500 mt-4 block"
          >
            {offers[activeTab]?.link_title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OfferTabs;
