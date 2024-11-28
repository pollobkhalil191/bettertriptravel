import React from "react";

interface ItineraryComponentProps {
  itinerary?: string;  // Expecting a string or undefined
}

const ItineraryComponent: React.FC<ItineraryComponentProps> = ({ itinerary }) => {
  return (
    <div>
      {itinerary ? (
        <div>
          <h3>Itinerary</h3>
          <p>{itinerary}</p>
        </div>
      ) : (
        <p>No itinerary available</p>
      )}
    </div>
  );
};

export default ItineraryComponent;
