import React from "react";
import Image from "next/image";

type Destination = {
  id: number;
  name: string;
  image: string;
};

type AweInspiringDestinationsProps = {
  aweInspiringDestinations: Destination[];
};

const AweInspiringDestinations: React.FC<AweInspiringDestinationsProps> = ({ aweInspiringDestinations }) => {
  return (
    <section className="px-4">
      <h2 className="text-2xl font-bold text-center">Awe-inspiring sports around the world</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {aweInspiringDestinations.map((destination) => (
          <div key={destination.id} className="relative group overflow-hidden rounded-lg shadow-lg">
            <Image
              src={destination.image}
              alt={destination.name}
              width={400}
              height={300}
              layout="responsive"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-lg font-bold text-white">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AweInspiringDestinations;
