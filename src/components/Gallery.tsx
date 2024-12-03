"use client"; // Ensure this at the top for Next.js App Router components.

import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";

// Define GalleryProps with correct type
type GalleryProps = {
  images: string[]; // Accept 'images' instead of 'gallery'
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="gallery">
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {images.slice(0, 2).map((image, index) => (
          <a key={index} href={image} className="block">
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
              width={500}
              height={300}
            />
          </a>
        ))}
        {images.length > 2 && (
          <a href="#" className="block mt-4 text-center text-blue-500">
            + {images.length - 2} More
          </a>
        )}
      </LightGallery>
    </div>
  );
};


export default Gallery;
