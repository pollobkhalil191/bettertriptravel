// src/app/layout.tsx
"use client"; // Ensure client-side rendering for components with hooks

import Navbar from '../app/components/Navbar';
import './globals.css'; // Global CSS or Tailwind CSS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
