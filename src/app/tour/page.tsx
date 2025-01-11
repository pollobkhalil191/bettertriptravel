"use client";

import React, { useEffect, useState, Suspense } from "react";
import TourCard from "@/components/TourCard";
import { useSearchParams } from "next/navigation";

const TourPage = () => {
  const [locationId, setLocationId] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const queryLocationId = searchParams?.get("location_id");

  const parsedLocationId = queryLocationId
    ? parseInt(queryLocationId, 10)
    : null;

  useEffect(() => {
    if (parsedLocationId !== null) {
      setLocationId(parsedLocationId);
    }
  }, [parsedLocationId]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <TourCard locationId={locationId} setLocationId={setLocationId} />
      </Suspense>
    </div>
  );
};

const TourPageWithSuspense = () => (
  <Suspense fallback={<div>Loading page...</div>}>
    <TourPage />
  </Suspense>
);

export default TourPageWithSuspense;
