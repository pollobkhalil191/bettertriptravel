// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import Google Font
import "./globals.css"; // Global styles
import NavBar from "@/components/Shared/NavBar";
import Footer from "@/components/Shared/Footer";

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Static metadata that applies to all pages by default
export const metadata: Metadata = {
  title: "Better-Trip-Travel",
  description: "Explore amazing travel experiences with Better-Trip-Travel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="betterTrip">
      <body className={inter.className}>
        {/* NavBar visible on all pages */}
        <NavBar />

        {/* Render dynamic children (page content) */}
        {children}

        {/* Footer visible on all pages */}
        <Footer />
      </body>
    </html>
  );
}
