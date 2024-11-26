"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiClient from "../../../Utils/apiClients";
import Image from "next/image";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Lightbox styles

const TourDetails = () => {
  const params = useParams();
  const tourId = params.id;

  const [tourDetails, setTourDetails] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false); // Lightbox visibility
  const [currentImage, setCurrentImage] = useState(0); // Track current image
  const [showAll, setShowAll] = useState(false); // To toggle gallery images

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await apiClient.get(`/tour/detail/${tourId}`);
        setTourDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [tourId]);

  if (!tourDetails) {
    return <div className="p-6 text-red-500">Loading tour details...</div>;
  }

  // Open lightbox for the clicked image
  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  // Handle show all images click
  const handleShowAllImages = () => {
    setShowAll(true);
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{tourDetails.title}</h1>

      {/* Featured Image, Video, and Gallery Section */}
      <div className="mt-4 flex flex-col lg:flex-row space-y-6 lg:space-y-0">
        {/* Left Side - Video */}
        <div className="lg:w-1/3">
          {tourDetails.video && (
            <iframe
              width="207"
              height="400"
              src={tourDetails.video}
              title="Tour Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Right Side - Featured Image */}
        <div className="lg:w-2/3 flex flex-col items-start">
          <Image
            src={tourDetails.image}
            alt={tourDetails.title}
            width={647}
            height={203}
            layout="intrinsic"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="lg:w-1/2 mt-4">
          {/* Display first two images */}
          <div className="grid grid-cols-1 gap-4">
            {tourDetails.gallery.slice(0, 2).map((image: string, index: number) => (
              <div key={index} className="w-full h-auto">
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  width={318}
                  height={196}
                  layout="intrinsic"
                  className="rounded-lg cursor-pointer"
                  onClick={() => openLightbox(index)} // Open lightbox on click
                />
              </div>
            ))}
          </div>

          {/* Display "+X more images" if there are more images */}
          {tourDetails.gallery.length > 2 && !showAll && (
            <button
              className="mt-4 text-blue-500 font-semibold"
              onClick={handleShowAllImages}
            >
              +{tourDetails.gallery.length - 2} more images
            </button>
          )}

          {/* If "showAll" is true, show all images */}
          {showAll && (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {tourDetails.gallery.slice(2).map((image: string, index: number) => (
                <div key={index} className="w-full h-auto">
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 3}`} // start from 3rd image
                    width={318}
                    height={196}
                    layout="intrinsic"
                    className="rounded-lg cursor-pointer"
                    onClick={() => openLightbox(index + 2)} // Add offset for lightbox
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <Lightbox
          mainSrc={tourDetails.gallery[currentImage]}
          nextSrc={tourDetails.gallery[(currentImage + 1) % tourDetails.gallery.length]}
          prevSrc={tourDetails.gallery[(currentImage + tourDetails.gallery.length - 1) % tourDetails.gallery.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setCurrentImage((currentImage + tourDetails.gallery.length - 1) % tourDetails.gallery.length)
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % tourDetails.gallery.length)
          }
          imageCaption={`Image ${currentImage + 1} of ${tourDetails.gallery.length}`}
        />
      )}

      {/* Description Section */}
      <div
        className="tour-description mt-6"
        dangerouslySetInnerHTML={{ __html: tourDetails.content }}
      />

      {/* Price */}
      <p className="text-lg font-semibold mt-4">
        Price: <span className="line-through text-red-500">{tourDetails.price}</span>{" "}
        {tourDetails.sale_price}
      </p>

      {/* Location */}
      <p className="mt-2">Location: {tourDetails.location.name}</p>
    </div>
  );
};

export default TourDetails;
