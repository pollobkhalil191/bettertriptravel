"use client"; // Ensure this at the top for Next.js App Router components.

import React from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";

type GalleryProps = {
  images: string[];
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const visibleImages = images.slice(0, 2); // Show only the first 2 images in the preview
  const hasMoreImages = images.length > 2;

  return (
    <div className="gallery gap-3">
      {/* Wrap all images in LightGallery */}
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {visibleImages.map((image, index) => (
          <a key={index} href={image} className="block">
            <Image
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-[188px]  mb-2 object-cover rounded-lg"
              width={300}
              height={300}
            />
          </a>
        ))}

        {/* Render remaining images hidden but accessible for LightGallery */}
        {hasMoreImages &&
          images.slice(2).map((image, index) => (
            <a
              key={index + 2}
              href={image}
              style={{ display: "none" }} // Hide these images from the visible UI
            >
              <Image
                src={image}
                alt={`Hidden Gallery Image ${index + 3}`}
                width={300}
                height={300}
              />
            </a>
          ))}
      </LightGallery>

      {/* Display "+ more" link */}
      {hasMoreImages && (
        <div className="-mt-10   text-center ">
          <a
            href="#"
            className="text-primary bg-white/70 backdrop-blur-md p-4 rounded-lg "
            onClick={(e) => {
              e.preventDefault();

              // Get the first hidden image and cast it to HTMLAnchorElement
              const firstHiddenImage = document.querySelector(
                ".gallery a[style='display: none;']"
              ) as HTMLAnchorElement;

              if (firstHiddenImage) {
                firstHiddenImage.click(); // Trigger LightGallery on the first hidden image
              }
            }}
          >
            + {images.length - 2} More
          </a>
        </div>
      )}
    </div>
  );
};

export default Gallery;
