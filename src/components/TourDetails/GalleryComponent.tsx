"use client";
import React, { useState, useEffect } from "react";
import apiClient from "../../Utils/apiClients";
import Image from "next/image";

interface GalleryComponentProps {
  tourId: number; // TourId prop to fetch the gallery
}

interface GalleryItem {
  image_id: number;
  title: string;
  desc: string;
  content: string;
  image: string; // Image URL to display
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ tourId }) => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]); // Array to store gallery items
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiClient.get(`/tour/detail/${tourId}`);
        const galleryData = response.data.data.gallery; // Assuming gallery is an array of image URLs
        
        // Check if gallery data is in the correct format
        if (Array.isArray(galleryData)) {
          // Map gallery URLs to the desired structure
          const formattedGallery = galleryData.map((url, index) => ({
            image_id: index + 1,  // Assign unique ID starting from 1
            title: `Gallery Image ${index + 1}`,
            desc: `Description for image ${index + 1}`,
            content: `Content related to image ${index + 1}`,
            image: url,
          }));

          setGallery(formattedGallery); // Set the formatted data to state
        } else {
          setError("Invalid gallery data format.");
        }
      } catch (error) {
        setError("Failed to fetch gallery images.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [tourId]);

  if (isLoading) {
    return <div>Loading gallery...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {gallery.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.image_id} className="relative">
              {/* Render Image using image URL */}
              <Image
                src={item.image} // Use 'image' property for the src
                alt={item.title}  // Use 'title' property for alt text
                width={500}
                height={300}
                className="rounded-lg w-full h-auto object-cover"
                layout="responsive"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No gallery images available.</p>
      )}
    </div>
  );
};

export default GalleryComponent;
