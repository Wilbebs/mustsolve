// File: /app/page.tsx

'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center py-20 px-4"
      >
        <Image src="/logo/crt-logo.svg" alt="CRT logo" width={64} height={64} className="mb-4" />
        <h1 className="text-5xl font-bold text-accent">Master Technical Interviews</h1>
        <p className="text-gray-600 mt-4 max-w-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac eros est. Integer at lectus justo.
        </p>
      </motion.section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 px-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((num) => (
          <motion.div
            key={num}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: num * 0.1 }}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <Image src="/logo/crt-logo.svg" alt="Feature Icon" width={40} height={40} className="mb-3" />
            <h2 className="text-xl font-semibold mb-2 text-accent">Feature {num}</h2>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec mi non elit suscipit egestas.
            </p>
          </motion.div>
        ))}
      </section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-gray-200 to-gray-100 text-center py-16 px-4"
      >
        <h2 className="text-3xl font-bold text-accent">Get Started Now</h2>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-2 bg-[#64ffda] text-gray-900 font-semibold rounded hover:bg-[#52e0c4] transition-all"
        >
          Sign Up
        </motion.button>
      </motion.section>

      {/* Footer Placeholder */}
      <footer className="text-center text-sm text-gray-500 py-8">
        <p>MustSolve &copy; 2025. All rights reserved.</p>
      </footer>
    </div>
  );
}

// STYLING IDEAS (for future implementation):
// - Add fade-in animations to sections on scroll using Framer Motion or AOS.js
// - Animate the CRT logo with a flicker or scanline effect
// - Add a floating particles background (like leetcode's glow dust)
// - Use hover-glow around feature boxes
// - Parallax scrolling on hero background or images
// - Use animated typewriter effect on the hero header ("Master Technical Interviews")
