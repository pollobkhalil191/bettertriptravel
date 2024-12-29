"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchHomePageData } from "../../Api/homePageService"; // Adjust this path if needed

// Define interfaces for data
interface Location {
  id: number;
  title: string;
  image: string;
}

interface ToursData {
  data: Array<{
    id: number;
    title: string;
    image: string;
  }>;
}

interface DestinationType {
  id: number;
  title: string;
  image: string;
  tourCount: number;
}

export default function Destination() {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await fetchHomePageData();
        
        console.log('Fetched data:', data); // Debugging log to check fetched data
        
        if (data) {
          const locations =
            data.data.find(
              (item: { type: string; model: { data: Location[] } }) =>
                item.type === "list_locations"
            )?.model?.data || [];

          console.log('Locations:', locations); // Debugging log to check locations data

          const destinationsWithTourCount = await Promise.all(
            locations.map(async (location: Location) => {
              const toursResponse = await fetch(
                `https://btt.triumphdigital.co.th/api/tour/search?location_id=${location.id}`
              );
              const toursData: ToursData = await toursResponse.json();

              console.log(`Tours data for location ${location.id}:`, toursData); // Debugging log for tour data

              return {
                id: location.id,
                title: location.title,
                image: location.image,
                tourCount: toursData.data.length || 0,
              };
            })
          );

          console.log('Destinations with tour count:', destinationsWithTourCount); // Debugging log for final destinations

          setDestinations(destinationsWithTourCount);
        } else {
          setError("Failed to fetch destinations data.");
        }
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("An error occurred while fetching destinations data.");
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchDestinations();
  }, []);

  if (loading) return <div>Loading destinations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-10 px-5 lg:px-28">
      <h2 className="text-2xl font-bold text-left mb-6">
        Awe-inspiring destinations around the world
      </h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scroll-smooth">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/tour?location_id=${destination.id}`} // Correctly pass location_id
              title={`Explore tours for ${destination.title}`}
              aria-label={`Explore tours for ${destination.title}`}
            >
              <div className="relative flex-shrink-0 w-[180px] h-[220px] overflow-hidden rounded-lg group cursor-pointer">
                <Image
                  src={destination.image}
                  alt={`Image of ${destination.title}`}
                  width={180}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                  <h3 className="text-white text-sm font-bold text-left">
                    {destination.title}
                  </h3>
                  <p className="text-white text-xs text-left">
                    {destination.tourCount} tours available
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
