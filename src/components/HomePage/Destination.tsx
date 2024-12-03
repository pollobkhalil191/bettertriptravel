"use client";

import { useEffect, useState } from "react"; 
import Link from "next/link";
import Image from "next/image";
import { fetchHomePageData } from "../../Api/homePageService";  // Adjust the path as needed

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
    tourCount: number;
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

  useEffect(() => {
    const fetchDestinations = async () => {
      const data = await fetchHomePageData();

      if (data) {
        const locations = data.data.find(
          (item: { type: string; model: { data: Location[] } }) => item.type === "list_locations"
        )?.model?.data || [];

        const destinationsWithTourCount = await Promise.all(
          locations.map(async (location: Location) => {
            const toursResponse = await fetch(
              `https://btt.triumphdigital.co.th/api/tour/search?location_id=${location.id}`
            );
            const toursData: ToursData = await toursResponse.json();
            return {
              id: location.id,
              title: location.title,
              image: location.image,
              tourCount: toursData.data.length || 0,
            };
          })
        );
        setDestinations(destinationsWithTourCount);
      } else {
        setError("Failed to fetch destinations data.");
      }
    };

    fetchDestinations();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-10 px-5 lg:px-20">
      <h2 className="text-2xl font-bold text-left mb-6">
        Awe-inspiring destinations around the world
      </h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scroll-smooth">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/Tours?location_id=${destination.id}`}
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
