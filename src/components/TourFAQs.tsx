// components/TourFAQs.tsx

import React from "react";

type TourFAQsProps = {
  faqs: { title: string; content: string }[];
};

const TourFAQs = ({ faqs }: TourFAQsProps) => {
  return (
    <section className="faqs">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h4>{faq.title}</h4>
          <p>{faq.content}</p>
        </div>
      ))}
    </section>
  );
};

export default TourFAQs;
