"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchHomePageData } from "../../Api/homePageService"; // Adjust this path if needed
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion"; // Import framer-motion for animations

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

// Carousel responsive settings
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    partialVisibilityGutter: 20, // Adds a gap for larger screens
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};

export default function Destination() {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await fetchHomePageData();

        if (data) {
          const locations =
            data.data.find(
              (item: { type: string; model: { data: Location[] } }) =>
                item.type === "list_locations"
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
      } catch (err) {
        console.error("Error fetching destinations:", err);
        setError("An error occurred while fetching destinations data.");
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section className="py-10 px-5 lg:px-20">
      <h2 className="text-2xl font-bold text-left mb-6">
        Awe-inspiring destinations around the world
      </h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="px-3" // Add gap between cards
      >
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
            animate={{ x: 0, opacity: 1 }}   // Animate into position
            transition={{
              delay: index * 0.2,             // Add stagger for each item
              duration: 0.6,                 // Duration of the animation
              type: "spring",                // Spring effect for smoother entry
              stiffness: 50,                 // Adjust spring stiffness
            }}
          >
            <Link
              href={`/tour?location_id=${destination.id}`}
              title={`Explore tours for ${destination.title}`}
              aria-label={`Explore tours for ${destination.title}`}
            >
              <div className="relative w-full h-[220px] overflow-hidden rounded-lg group cursor-pointer">
                <Image
                  src={destination.image}
                  alt={`Image of ${destination.title}`}
                  width={300}
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
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
}
