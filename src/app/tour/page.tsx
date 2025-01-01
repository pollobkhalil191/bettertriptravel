"use client";

import React, { useEffect, useState, Suspense } from "react";
import TourCard from "@/components/TourCard";
import { useSearchParams } from "next/navigation";

const TourPage = () => {
  const [locationId, setLocationId] = useState<number | null>(null); // Define state for locationId
  const searchParams = useSearchParams();
  const queryLocationId = searchParams?.get("location_id");

  const parsedLocationId = queryLocationId ? parseInt(queryLocationId, 10) : null;

  // Set the locationId from the query string if available
  useEffect(() => {
    if (parsedLocationId !== null) {
      setLocationId(parsedLocationId);
    }
  }, [parsedLocationId]);

  return (
    <div>
      {/* Wrap the TourCard component in a Suspense boundary */}
      <Suspense fallback={<div>Loading...</div>}>
    
        <TourCard locationId={locationId} setLocationId={setLocationId} />
      </Suspense>
    </div>
  );
};

// Wrap the entire page in Suspense to resolve the error
const TourPageWithSuspense = () => (
  <Suspense fallback={<div>Loading page...</div>}>
    <TourPage />
  </Suspense>
);

export default TourPageWithSuspense;
