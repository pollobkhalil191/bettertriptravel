"use client";

import React, { useEffect, useState } from "react";
import TourCard from "@/components/TourCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

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
    <Suspense fallback={<div>Loading...</div>}>
      {/* Pass locationId and setLocationId to the TourCard component */}
      <div>
        <TourCard locationId={locationId} setLocationId={setLocationId} />
      </div>
    </Suspense>
  );
};

export default TourPage;
