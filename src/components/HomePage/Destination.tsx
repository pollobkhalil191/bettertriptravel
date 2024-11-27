"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Destination {
  id: number;
  title: string;
  image: string;
  tourCount: number;
}

export default function Destination() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "https://btt.triumphdigital.co.th/api/home-page"
        );
        const data = await response.json();

        const locations = data.data.find(
          (item: any) => item.type === "list_locations"
        )?.model?.data;

        if (locations) {
          const destinationsWithTourCount = await Promise.all(
            locations.map(async (location: any) => {
              const toursResponse = await fetch(
                `https://btt.triumphdigital.co.th/api/tour/search?location_id=${location.id}`
              );
              const toursData = await toursResponse.json();
              return {
                id: location.id,
                title: location.title,
                image: location.image,
                tourCount: toursData.data.length || 0,
              };
            })
          );
          setDestinations(destinationsWithTourCount);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchDestinations();
  }, []);

  const handleSlider = (direction: "left" | "right") => {
    const cardWidth = 180; // Width of one card
    const visibleCards = 6; // Number of cards to display at once
    const totalCards = destinations.length;
    const scrollAmount = cardWidth * visibleCards;

    if (direction === "right" && currentIndex + visibleCards < totalCards) {
      setCurrentIndex(currentIndex + visibleCards);
    } else if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - visibleCards);
    }
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + 6 < destinations.length;

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + 6);

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-10 px-5 lg:px-20">
      <h2 className="text-2xl font-bold text-left mb-6">
        Awe-inspiring destinations around the world
      </h2>
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-hidden scroll-smooth transition-transform duration-500 ease-in-out"
        >
          {visibleDestinations.map((destination) => (
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
        {/* Left Arrow */}
        <button
          onClick={() => handleSlider("left")}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg ${
            canScrollLeft ? "block" : "hidden"
          }`}
        >
          <IoIosArrowBack size={24} />
        </button>
        {/* Right Arrow */}
        <button
          onClick={() => handleSlider("right")}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg ${
            canScrollRight ? "block" : "hidden"
          }`}
        >
          <IoIosArrowForward size={24} />
        </button>
      </div>
    </section>
  );
}
