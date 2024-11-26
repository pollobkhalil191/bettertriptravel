// components/TourGallery.tsx

import Image from "next/image";
import React from "react";

type TourGalleryProps = {
  gallery: string[];
};

const TourGallery = ({ gallery }: TourGalleryProps) => {
  return (
    <section className="gallery">
      {gallery.map((image, index) => (
        <Image key={index} src={image} alt={`Gallery image ${index + 1}`} />
      ))}
    </section>
  );
};

export default TourGallery;
