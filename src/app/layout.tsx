// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Shared/NavBar";
import Footer from "@/components/Shared/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
        {/* Wrap the app with AuthProvider to manage authentication */}
        <AuthProvider>
          {/* NavBar visible on all pages */}
          <NavBar />
          {/* Render dynamic children (page content) */}
          {children}
          {/* Footer visible on all pages */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
