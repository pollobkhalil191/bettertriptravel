// src/types/apiResponses.ts

// Home page response structure
export interface HomePageResponse {
    data: {
      featuredTours: Tour[];  // Example field, modify based on actual response
      // Add more fields as per the API response
    };
  }
  
  // Tour search response structure
  export interface TourSearchResponse {
    tours: Tour[]; // Array of tours
  }
  
  // Tour detail response structure
  export interface TourDetailResponse {
    tour: Tour;  // A single tour object
  }
  
  // Tour availability response structure
  export interface TourAvailabilityResponse {
    availability: Availability[]; // List of available dates or times
  }
  
  // Tour write review response structure
  export interface TourWriteReviewResponse {
    message: string; // Success or failure message
  }
  
  // Auth login response structure
  export interface AuthLoginResponse {
    token: string; // Authorization token
    user: User;    // User object containing user details
  }
  
  // Auth me response structure (for getting logged-in user details)
  export interface AuthMeResponse {
    user: User;  // Logged-in user details
  }
  
  // User booking history response structure
  export interface UserBookingHistoryResponse {
    bookings: Booking[]; // List of bookings made by the user
  }
  
  // User wishlist response structure
  export interface UserWishlistResponse {
    wishlist: Tour[]; // List of tours saved to the wishlist
  }
  
  // Define Tour object structure
  export interface Tour {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    // Add more properties based on the tour details
  }
  
  // Define Availability object structure (for TourAvailabilityResponse)
  export interface Availability {
    date: string; // Available date or time for the tour
    availableSeats: number; // Available seats on that date
    // Add more fields based on the availability structure
  }
  
  // Define User object structure
  export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    // Add more user-specific fields
  }
  
  // Define Booking object structure
  export interface Booking {
    id: number;
    tourId: number;
    userId: number;
    bookingDate: string;
    status: string; // e.g. 'confirmed', 'pending'
    // Add more fields as per the booking details
  }
  