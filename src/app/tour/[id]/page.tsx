"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "../../../Utils/apiClients";
import Image from "next/image";

// Define TypeScript interfaces
interface TourDetails {
  id: number;
  title: string;
  image: string;
  video?: string;
  gallery: string[];
  content: string;
  price: string;
  sale_price: string;
  location: {
    name: string;
  };
}

const TourDetails = () => {
  const params = useParams();
  const tourId = params.id;

  const [tourDetails, setTourDetails] = useState<TourDetails | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await apiClient.get(`/tour/detail/${tourId}`);
        setTourDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [tourId]);

  if (!tourDetails) {
    return <div className="p-6 text-red-500">Loading tour details...</div>;
  }

  const handleShowAllImages = () => {
    setShowAll(true);
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{tourDetails.title}</h1>

      {/* Featured Section */}
      <div className="mt-4 flex flex-col lg:flex-row gap-6">
        {/* Video */}
        {tourDetails.video && (
          <div className="lg:w-1/3">
            <iframe
              className="w-full h-64 md:h-96 rounded-lg"
              src={tourDetails.video}
              title="Tour Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Featured Image */}
        <div className="lg:w-2/3">
          <Image
            src={tourDetails.image}
            alt={tourDetails.title}
            width={800}
            height={400}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>

      {/* Gallery Section */}
      {tourDetails.gallery && tourDetails.gallery.length > 0 ? (
        <div className="mt-6">
          {/* Display first two images */}
          <div className="grid grid-cols-2 gap-4">
            {tourDetails.gallery.slice(0, 2).map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {tourDetails.gallery.length > 2 && !showAll && (
            <button
              className="mt-4 text-blue-500 font-semibold"
              onClick={handleShowAllImages}
            >
              +{tourDetails.gallery.length - 2} more images
            </button>
          )}

          {/* Show All Images */}
          {showAll && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {tourDetails.gallery.slice(2).map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 3}`}
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 text-gray-500">No gallery images available.</p>
      )}

      {/* Description Section */}
      <div
        className="mt-6"
        dangerouslySetInnerHTML={{ __html: tourDetails.content }}
      />

      {/* Pricing Section */}
      <p className="text-lg font-semibold mt-4">
        Price: <span className="line-through text-red-500">{tourDetails.price}</span>{" "}
        {tourDetails.sale_price}
      </p>

      {/* Location */}
      <p className="mt-2">Location: {tourDetails.location.name}</p>
    </div>
  );
};

export default TourDetails;
