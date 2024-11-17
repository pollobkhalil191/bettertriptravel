// src/app/layout.tsx
"use client"; // Ensure client-side rendering for components with hooks

import Header from './components/Header';
import './globals.css'; // Global CSS or Tailwind CSS
import 'tailwindcss/tailwind.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
