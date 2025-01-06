"use client";

import React, { useEffect, useState } from "react";
import { fetchTourDetails } from "../Api/tourDetails";

const FAQsAccordion = ({ tourId }: { tourId: string | number }) => {
  const [faqs, setFaqs] = useState<{ title: string; content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track the open accordion item

  // Fetch tour details and extract FAQs
  useEffect(() => {
    const getTourFAQs = async () => {
      try {
        setLoading(true);
        const tourDetails = await fetchTourDetails(tourId);
        setFaqs(tourDetails.data.faqs || []);
      } catch (err) {
        setError("Failed to fetch FAQs. Please try again later.");
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    getTourFAQs();
  }, [tourId]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">No FAQs available for this tour.</p>
      </div>
    );
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the current index
  };

  return (
    <div className="max-w-3xl  p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              className="w-full text-left flex justify-between items-center py-4 text-lg font-semibold text-gray-700 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {faq.title}
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 leading-relaxed">
                {faq.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsAccordion;
