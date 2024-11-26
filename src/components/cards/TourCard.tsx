"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import apiClient from "../../Utils/apiClients";
import { HeartIcon } from "@heroicons/react/24/solid";
import { FaStar } from "react-icons/fa";
import PriceFilterPopup from "../PriceFilterPopup";
import { div } from "framer-motion/client";

interface Tour {
  id: number;
  title: string;
  image: string;
  location: {
    id: number;
    name: string;
  };
  duration: string;
  review_score: {
    score_total: number;
    total_review: number;
  };
  sale_price: string;
}

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    price: "",
    language: "",
    duration: "",
    time: "",
  });
  const [sort, setSort] = useState<string>("recommended");
  const [filterPopup, setFilterPopup] = useState<boolean>(false);

  useEffect(() => {
    const destinationQuery = new URLSearchParams(window.location.search).get("location_id");
    if (destinationQuery) {
      setDestinationId(destinationQuery);
    }
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      let allTours: Tour[] = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await apiClient.get("/tour/search", {
            params: {
              limit: 10,
              page: page,
            },
          });

          const newTours: Tour[] = response.data.data || [];
          allTours = [...allTours, ...newTours];

          hasMore = response.data.meta?.has_more ?? newTours.length > 0;
          page++;
        }

        setTours(allTours);
      } catch (err: any) {
        console.error("Error fetching tours:", err.response || err);
        setError("Failed to fetch tours");
      }
    };

    fetchTours();
  }, []);

  const filteredTours = tours.filter((tour) => {
    const matchesPrice = filters.price ? tour.sale_price === filters.price : true;
    const matchesLanguage = filters.language ? tour.title.includes(filters.language) : true;
    const matchesDuration = filters.duration ? tour.duration.includes(filters.duration) : true;
    const matchesTime = filters.time ? tour.duration.includes(filters.time) : true;

    return matchesPrice && matchesLanguage && matchesDuration && matchesTime;
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
      
   
    <div className="p-4 lg:px-14 lg:py-14">
  
      {/* Top Filters and Sort Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Left Side Filters */}
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">Price</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
          <select
            className="p-2 border rounded"
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          >
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <select
            className="p-2 border rounded"
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          >
            <option value="">Duration</option>
            <option value="short">Short</option>
            <option value="long">Long</option>
          </select>
          <select
            className="p-2 border rounded"
            value={filters.time}
            onChange={(e) => setFilters({ ...filters, time: e.target.value })}
          >
            <option value="">Time</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        {/* Right Side Sort and Filter */}
        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            className="p-2 border rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>

          {/* Filter Button */}
          <button
            onClick={() => setFilterPopup(true)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Tours Found Message */}
      <div className="mb-4 text-gray-700">
        <span className="font-semibold">{filteredTours.length}</span> Tours Found
      </div>

      {/* Filter Popup */}
      {filterPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[645px] h-[530px]">
            <h2 className="text-lg font-bold mb-4">Filter Options</h2>
            {/* Add your filter options here */}
            <button
              onClick={() => setFilterPopup(false)}
              className="mt-4 p-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tours Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTours.map((tour) => (
          <motion.div
            key={tour.id}
            className="tour-card bg-white rounded-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="relative">
              <Image
                width={500}
                height={300}
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <div className="absolute top-2 right-2">
                <HeartIcon className="w-6 h-6 text-white hover:text-red-500 transition-colors duration-300" />
              </div>
            </div>
            <div className="p-4 border-2">
              <p className="text-sm text-gray-500">
                <a
                  href={`/Tours?location_id=${tour.location.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {tour.location.name}
                </a>
              </p>
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{tour.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-500">{tour.duration}</p>
                <p className="text-lg font-bold text-primary">
                  From <span className="font-semibold">{tour.sale_price}</span>
                  <span className="text-sm font-light"> per person</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
