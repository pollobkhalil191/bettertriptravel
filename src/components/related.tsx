// components/RelatedTours.tsx
import TourCard from "../components/TourCard";
import { Key, SetStateAction } from "react";

interface RelatedTour {
  id: number;
  title: string;
  price: number; // Changed to number
  sale_price: number; // Changed to number
  discount_percent: string;
  image: string;
  location: {
    id: number | null;
    name: string;
  };
}

interface RelatedToursProps {
  related: RelatedTour[];
}

const RelatedTours = ({ related }: RelatedToursProps) => {
  return (
    // Related Tours
    related.length > 0 && (
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Tours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((relatedTour) => (
            <TourCard
              key={relatedTour.id}
              id={relatedTour.id}
              title={relatedTour.title}
              price={relatedTour.price} // Passed as number
              sale_price={relatedTour.sale_price} // Passed as number
              discount_percent={relatedTour.discount_percent}
              image={relatedTour.image}
              location={relatedTour.location.name}
              locationId={null}
              setLocationId={function (
                value: SetStateAction<number | null>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default RelatedTours;
