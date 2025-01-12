import { useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Importing AuthContext

// Define the types for the props
interface AddToCartButtonProps {
  tourId: number;
  adultGuests: number; // Number of adult guests
  childGuests: number; // Number of child guests
  serviceFee: number; // Service fee (if applicable)
  startDate: Date | null; // Start date for the tour
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tourId,
  adultGuests,
  childGuests,
  serviceFee,
  startDate,
}) => {
  const { isAuthenticated } = useAuth(); // Access authentication state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    if (!startDate) {
      setError("Please select a start date before adding to cart.");
      return;
    }

    if (!isAuthenticated) {
      setError("You need to be logged in to add to cart.");
      return;
    }

    setError(null); // Clear any existing errors
    setLoading(true); // Show loading state

    const token = localStorage.getItem("access_token"); // Get token from local storage
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const service_id = tourId; // Set the service ID dynamically
    const startDateString = startDate.toISOString().split("T")[0]; // Format the start date

    // Constructing the "person_types" array with the number of guests for adults and children
    const personTypes = [
      {
        name: "Adult",
        desc: "Age 18+",
        min: "1",
        max: "10",
        price: "1000",
        display_price: "$1,000",
        number: adultGuests.toString(),
      },
      {
        name: "Child",
        desc: "Age 6-17",
        min: "0",
        max: "10",
        price: "300",
        display_price: "$300",
        number: childGuests.toString(),
      },
    ];

    // Constructing the payload for the POST request
    const payload = {
      service_id: service_id,
      service_type: "tour",
      start_date: startDateString,
      person_types: personTypes,
      extra_price:
        serviceFee > 0
          ? [
              {
                name: "Service Fee",
                price: serviceFee.toString(),
                type: "one_time",
                number: 1,
                enable: "1",
                price_html: `$${serviceFee}`,
                price_type: "currency",
              },
            ]
          : [],
      guests: adultGuests + childGuests, // Total guests count
    };

    try {
      console.log("Sending request...");
      // Sending the POST request with the payload
      const response = await axios.post(
        "https://btt.triumphdigital.co.th/api/booking/addToCart",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      console.log(response); // Log the response for debugging

      // Handling the response from the server
      if (response.data.status === 1) {
        alert(
          `Added to cart successfully! Booking Code: ${response.data.booking_code}`
        );
        window.location.href = response.data.url; // Redirect to checkout
      } else {
        setError(response.data.message || "Failed to add to cart.");
      }
    } catch (err: any) {
      console.error(err); // Log the error for debugging
      setError(
        err?.response?.data?.message ||
          "An error occurred while adding to cart."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600"
        } text-white py-2 px-4 rounded`}
        disabled={loading}
      >
        {loading ? "Adding to Cart..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default AddToCartButton;
