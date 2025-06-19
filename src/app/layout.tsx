// File: /app/layout.tsx

import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "MustSolve",
  description: "Essential LeetCode Training",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans select-none">
        <nav className="relative flex items-center justify-between px-6 py-4 border-b border-green-400 bg-black">
          {/* Left logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-green-400">MustSolve</h1>
            <Image
              src="/logo/crt-logo.svg"
              alt="CRT monitor logo with code"
              width={28}
              height={28}
              className="rounded-md border border-green-400"
            />
          </div>

          {/* Center nav links */}
          <ul className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 text-lg text-green-400">
            <li>
              <Link
                href="/"
                className="transition duration-200 hover:text-white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/practice"
                className="transition duration-200 hover:text-white"
              >
                Practice
              </Link>
            </li>
            <li>
              <Link
                href="/lessons"
                className="transition duration-200 hover:text-white"
              >
                Lessons
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="transition duration-200 hover:text-white"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="transition duration-200 hover:text-white"
              >
                Leaderboard
              </Link>
            </li>
          </ul>

          {/* Right login button */}
          <div>
            <Link
              href="/login"
              className="text-green-400 border border-green-400 px-4 py-1 rounded hover:bg-green-400 hover:text-black transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </nav>

        <main className="px-6 py-8 max-w-5xl mx-auto bg-white">{children}</main>
      </body>
    </html>
  );
}
