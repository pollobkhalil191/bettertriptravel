"use client";

import React, { useState } from "react";
import TourCard from "@/components/TourCard";
import { useSearchParams } from "next/navigation";

const TourPage = () => {
  const [locationId, setLocationId] = useState<number | null>(null); // Define state for locationId
  const searchParams = useSearchParams();
  const queryLocationId = searchParams.get("location_id");

  const parsedLocationId = queryLocationId ? parseInt(queryLocationId, 10) : null;
  
  // Set the locationId from the query string if available
  React.useEffect(() => {
    if (parsedLocationId !== null) {
      setLocationId(parsedLocationId);
    }
  }, [parsedLocationId]);

  return (
    <div>
      {/* Pass locationId and setLocationId to the TourCard component */}
      <TourCard locationId={locationId} setLocationId={setLocationId} />
    </div>
  );
};

export default TourPage;
