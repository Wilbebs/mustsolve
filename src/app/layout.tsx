// File: src/app/layout.tsx

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "MustSolve - LeetCode Practice Platform",
  description: "Practice Data Structures and Algorithms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans select-none">
        <AuthProvider>
          <Navbar />
          <main className="bg-white">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}