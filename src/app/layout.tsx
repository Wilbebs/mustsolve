// File: src/app/layout.tsx

import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
        <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-green-400/20">
          <div className="max-w-8xl mx-auto px-8 py-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-4 group">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  MustSolve
                </h1>
                <Image
                  src="/logo/crt-logo.svg"
                  alt="MustSolve Logo"
                  width={32}
                  height={32}
                  className="rounded-lg border border-green-400/30 group-hover:border-green-400 transition-colors duration-200"
                />
              </Link>

              {/* Navigation Links - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-green-500/20 active:bg-green-500/30 active:scale-95 transition-all duration-200 font-medium border border-transparent hover:border-green-400/30"
                >
                  Home
                </Link>
                <Link
                  href="/practice"
                  className="px-5 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-green-500/20 active:bg-green-500/30 active:scale-95 transition-all duration-200 font-medium border border-transparent hover:border-green-400/30"
                >
                  Practice
                </Link>
                <Link
                  href="/friends"
                  className="px-5 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-green-500/20 active:bg-green-500/30 active:scale-95 transition-all duration-200 font-medium border border-transparent hover:border-green-400/30"
                >
                  Friends
                </Link>
              </div>

              {/* Login Button */}
              <Link
                href="/login"
                className="px-6 py-2.5 bg-transparent border-2 border-green-400 text-green-400 rounded-full hover:bg-green-400 hover:text-black hover:shadow-lg hover:shadow-green-400/25 active:scale-95 transition-all duration-200 font-semibold"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>

        <main className="bg-white">{children}</main>
      </body>
    </html>
  );
}