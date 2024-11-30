// types/tour.ts

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
  
  export interface Tour {
    id: string;
    title: string;
    location: {
      name: string;
    };
    duration: string;
    sale_price: number;
    price: number;
    discount_percent: string;
    image: string;
    video: string;
    content: string;
    gallery: GalleryImage[];
    review_lists: {
      data: Review[];
    };
    faqs: Faq[];
    extra_price: ExtraPrice[];
    related: Tour[];
  }
  