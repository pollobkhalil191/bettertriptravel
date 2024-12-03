// Shared Types
export interface GalleryImage {
  id: string;
  url: string;
}

export interface Review {
  id: string;
  author: {
    name: string;
  };
  content: string;
  rate_number: number;
}

export interface Faq {
  title: string;
  content: string;
}

export interface ExtraPrice {
  name: string;
  price: number;
}

export interface ReviewScore {
  score_total: string;
  total_review: number;
}

export interface Location {
  id: number;
  name: string;
}





// Detailed Tour (Single Tour Details)
// src/types/tour.ts

export type Tour = {
  id: number;
  title: string;
  price: string;
  sale_price: string;
  discount_percent: string;
  image: string;
  content: string;
  location: {
    id: number;
    name: string;
  };
  is_featured: number;
  duration: string;
  review_score: {
    score_total: string;
    total_review: number;
  };
  gallery: { id: number; url: string }[];
  review_lists: {
    data: { id: number; author: { name: string }; content: string; rate_number: number }[];
  };
  faqs: { title: string; content: string }[];
  extra_price: { name: string; price: string }[];
  video: string;
};

