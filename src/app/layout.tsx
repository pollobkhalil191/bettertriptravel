// src/app/layout.tsx
import './globals.css'; // Ensure global styles are imported
import 'tailwindcss/tailwind.css';
import Header from './components/Header'; // Correct import path for Header

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
