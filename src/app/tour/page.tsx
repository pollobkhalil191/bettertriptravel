"use client";

import React, { useEffect, useState, Suspense } from "react";
import TourCard from "@/components/TourCard";
import { useSearchParams } from "next/navigation";
import TourFilters from "@/components/tourFilters";

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
     <TourFilters locationId={null} setLocationId={function (id: number | null): void {
          throw new Error("Function not implemented.");
        } }/>
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
