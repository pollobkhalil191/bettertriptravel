import { fetchTourDetails } from "../../../Api/tourDetails";
import { notFound } from "next/navigation";
import Gallery from "../../../components/Gallery";
import Image from "next/image";

import { Metadata } from "next";
import ReviewComponent from "@/components/review";

import ItineraryTourDetails from "@/components/tourDetails/itinerary";
import Link from "next/link";

import FAQsComponent from "@/components/faq";
import TourBookingForm from "@/components/TourBooking";

// Define the Tour details type
interface Tour {
  id: number;
  category: { name: string };
  title: string;
  price: number;
  sale_price?: number;
  discount_percent?: string;
  content: string;
  duration: string;
  max_people: number;
  address: string;
  location: {
    name: string;
  };

  gallery: string[];
  banner_image?: string;
  video?: string;
  review_score?: {
    score_text: string;
    score_total: number;
  };
  review_lists?: Record<string, unknown>;
}

// Define API Response Type
interface TourApiResponse {
  data: Tour | null;
}

// Page Props Interface for Dynamic Route
interface PageProps {
  params: Promise<{ id: string }>; // Correct type for Next.js dynamic route parameters
}

// Fetch Tour Details
async function getTourDetails(id: string): Promise<Tour | null> {
  try {
    const response: TourApiResponse = await fetchTourDetails(id);
    return response?.data || null;
  } catch (error) {
    console.error("Error fetching tour details:", error);
    return null;
  }
}

// Generate Metadata for the Page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Await params to ensure we can access the id properly
  const { id } = await params;

  const tour = await getTourDetails(id);
  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The tour you are looking for does not exist.",
    };
  }

  return {
    title: tour.title,
    description: tour.content.substring(0, 150) + "...", // Extract a short description
  };
}

// Main Component
const TourDetails = async ({ params }: PageProps) => {
  // Await params before accessing its properties
  const { id } = await params; // Now waiting for the promise to resolve

  if (!id) {
    notFound();
    return null;
  }

  const tour = await getTourDetails(id);
  if (!tour) {
    notFound();
    return null;
  }

  const {
    title,
    content,
    gallery = [],
    banner_image = "",
    video = null,
    review_score = { score_text: "No reviews", score_total: 0 },
    sale_price = "N/A",
  } = tour;

  return (
    <div className=" mx-auto px-6 lg:px-64 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h1>

      <div className="review-score mb-8">
        <p className="text-lg text-gray-800">
          Rating:{" "}
          <span className="font-semibold">{review_score.score_text}</span> (
          {review_score.score_total} stars)
        </p>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`text-xl ${
                index < Math.round(review_score.score_total)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {video && (
          <div className="video mb-8">
            <iframe
              src={video}
              title="Tour Video"
              width="100%"
              height="388"
              className="rounded-lg"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {banner_image && (
          <div className="banner mb-8">
            <Image
              src={banner_image}
              alt="Banner"
              className="w-full h-96 object-cover rounded-lg"
              width={900}
              height={400}
            />
          </div>
        )}

        <Gallery images={gallery} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6 mt-6">
        <div className="tour-description mb-8 text-sm font-semibold text-gray-700 space-y-4 flex-1">
          <div
            dangerouslySetInnerHTML={{
              __html: content || "No description available.",
            }}
          />

          {/* About this activity */}

          <div className=" pt-6 max-w-md">
            <h2 className="text-xl font-bold text-navy-900 mb-4">
              About this activity
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-lg text-gray-900">
                    Location
                  </p>
                  <p className="text-sm font-sm text-800">
                    {tour.location.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-lg  text-gray-900">
                    Groupe size
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {tour.max_people}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-lg text-gray-900">
                    Duration{" "}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {tour.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-primary flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-lg text-gray-900">Type</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {tour.category.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review section  */}

        <div className="flex flex-col lg:w-1/3 space-y-6 lg:space-y-8">
          <div className="price-section flex items-center justify-between border-2 border-t-4 border-t-blue-600 bg-white p-6 shadow-sm">
            {sale_price !== "N/A" && (
              <p className="text-3xl font-semibold text-primary">
                <span className="text-sm text-primary">From</span> <br />$
                {sale_price}
                <br />
                <span className="text-sm text-primary">per person</span>
              </p>
            )}

            <Link href="#2">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Check Availability
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ReviewComponent tourId={id} />
      <div>
        <ItineraryTourDetails tourId={id} />
      </div>

      <div id="2" className="location-section mb-8">
        <TourBookingForm tourId={id} />
      </div>

      <div>
        <FAQsComponent tourId={id} />
      </div>
    </div>
  );
};

export default TourDetails;
