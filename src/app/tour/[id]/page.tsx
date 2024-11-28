"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "../../../Utils/apiClients";
import GalleryComponent from "@/components/TourDetails/GalleryComponent";
import ItineraryComponent from "@/components/TourDetails/ItineraryComponent";
import ReviewsComponent from "@/components/TourDetails/ReviewsComponent";

// Define the TourDetails type (adjust according to your API response structure)
interface TourDetails {
  id: number;
  title: string;
  image: string;
  video?: string;
  gallery: string[];  // Gallery images array
  content: string;
  price: string;
  sale_price: string;
  location: {
    name: string;
  };
  itinerary?: string;
  reviews?: string[];
}

const Page = () => {
  const params = useParams();
  const tourId = params.id;

  const [tourDetails, setTourDetails] = useState<TourDetails | null>(null);
  const [isClient, setIsClient] = useState(false);  // Prevent hydration error

  useEffect(() => {
    setIsClient(true); // Set to true once the client has hydrated

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

  if (!isClient) {
    return <div>Loading...</div>; // Prevent server-side rendering until the client is ready
  }

  if (!tourDetails) {
    return <div className="p-6 text-red-500">Loading tour details...</div>;
  }

  return (
    <div>
      {/* Pass the gallery prop to the GalleryComponent */}
      <GalleryComponent gallery={tourDetails.gallery} />

      {/* Pass other necessary props to ItineraryComponent and ReviewsComponent */}
      <ItineraryComponent itinerary={tourDetails.itinerary} />
      <ReviewsComponent reviews={tourDetails.reviews} />
    </div>
  );
};

export default Page;
