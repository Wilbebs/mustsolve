// File: src/app/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as any
    }
  };

  const features = [
    {
      icon: "🎯",
      title: "5 Essential Problems",
      description: "Master the most critical LeetCode problems that appear in 80% of technical interviews",
      details: ["Two Sum & Hash Maps", "Linked List Manipulation", "Stack Operations", "Tree Traversals", "Optimized Solutions"]
    },
    {
      icon: "🤖", 
      title: "AI-Powered Interviews",
      description: "Practice with cutting-edge AI that simulates real interview conditions",
      details: ["Real-time feedback", "Complexity analysis", "Communication skills", "Follow-up questions", "Performance tracking"]
    },
    {
      icon: "⚡",
      title: "10-Hour Intensive",
      description: "Structured micro-course designed for maximum learning efficiency",
      details: ["Daily 2-hour sessions", "Progressive difficulty", "Immediate practice", "Reflection exercises", "Proven methodology"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black relative overflow-hidden">
      {/* NVIDIA-Style Geometric Background */}
      <div className="absolute inset-0">
        {/* Animated geometric shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-green-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-green-500/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-green-300/20 rotate-12 animate-bounce-slow"></div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-green-400/10 rotate-45 animate-float"></div>
        <div className="absolute top-1/4 right-1/3 w-20 h-20 border-2 border-green-500/30 rotate-45 animate-float-reverse"></div>
        <div className="absolute bottom-1/3 right-20 w-12 h-12 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rotate-45 animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/6 left-1/3 w-64 h-64 bg-gradient-radial from-green-400/20 via-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-gradient-radial from-emerald-400/15 via-green-600/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-radial from-green-300/25 via-green-400/15 to-transparent rounded-full blur-2xl animate-bounce-slow"></div>
        
        {/* Hexagon shapes */}
        <div className="absolute top-16 right-1/4 w-20 h-20 hexagon bg-green-400/10 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 hexagon bg-green-500/15 animate-spin-reverse"></div>
      </div>

      <div className="relative z-10 w-full px-8 py-8">
        {/* Hero Section */}
        <motion.section
          className="flex flex-col items-center justify-center text-center py-20 px-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            animate={floatingAnimation}
            className="mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <Image 
                src="/logo/crt-logo.svg" 
                alt="MustSolve Logo" 
                width={80} 
                height={80} 
                className="relative rounded-2xl border-2 border-green-400/50"
              />
            </div>
          </motion.div>

          <motion.h1 
            className="text-7xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            variants={itemVariants}
          >
            Master Technical Interviews
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-300 mt-4 max-w-4xl leading-relaxed"
            variants={itemVariants}
          >
            Essential LeetCode Training - The most efficient path to landing your dream job at top tech companies
          </motion.p>

          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-6"
            variants={itemVariants}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <Link href="/course-overview">
                <motion.button
                  className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-green-400/50 group-hover:border-green-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 Start Your Journey
                </motion.button>
              </Link>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <Link href="#course-overview-video">
                <motion.button
                  className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-blue-400/50 group-hover:border-blue-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎥 Watch Overview
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Course Overview Video Section */}
        <motion.section 
          id="course-overview-video"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Course Overview</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get an in-depth look at what makes Essential LeetCode Training the most effective 
                interview preparation course available
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 shadow-2xl">
              {/* Video Container */}
              <div className="relative group mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-green-400/30">
                  <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl">
                    {!videoLoaded && (
                      <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                          <p className="text-gray-300">Loading course overview...</p>
                        </div>
                      </div>
                    )}
                    <iframe
                      src="https://www.youtube.com/embed/CClTpsHaOG4?enablejsapi=1&rel=0&modestbranding=1"
                      title="Essential LeetCode Training - Course Overview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                      onLoad={() => setVideoLoaded(true)}
                    />
                  </div>
                </div>
              </div>

              {/* Video Information */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">📚</span>
                    What You'll Discover
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Complete course structure and methodology
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      The 5 essential problems and why they matter
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      AI-powered learning and assessment tools
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Success stories and career outcomes
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      How to maximize your learning experience
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">⏱️</span>
                    Course Highlights
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">Duration</span>
                      <span className="text-white font-semibold">10 Hours Total</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">Format</span>
                      <span className="text-white font-semibold">5 Daily Sessions</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">Difficulty</span>
                      <span className="text-white font-semibold">All Levels</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-green-400 font-semibold">95%+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interactive Features Section */}
        <motion.section 
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Why Choose MustSolve?</h2>
              <p className="text-xl text-gray-300">
                Revolutionary features that set us apart from traditional interview prep
              </p>
            </div>

            {/* Feature Selector */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-4 p-2 bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-600">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="text-2xl mr-2">{feature.icon}</span>
                    {feature.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Feature Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-black/60 backdrop-blur-sm rounded-3xl p-12 border border-green-500/30"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl">{features[activeFeature].icon}</div>
                      <div>
                        <h3 className="text-4xl font-bold text-white">{features[activeFeature].title}</h3>
                      </div>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                      {features[activeFeature].description}
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {features[activeFeature].details.map((detail, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                          <span className="text-gray-200">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-green-400/30">
                      <div className="text-center">
                        <div className="text-8xl mb-6">{features[activeFeature].icon}</div>
                        <div className="text-6xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-4">
                          {activeFeature === 0 ? "5" : activeFeature === 1 ? "AI" : "10h"}
                        </div>
                        <p className="text-gray-300 text-lg">
                          {activeFeature === 0 ? "Essential Problems" : 
                           activeFeature === 1 ? "Powered Learning" : "Intensive Course"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section 
          className="py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Proven Results</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Students Trained", icon: "👥" },
                { number: "95%", label: "Success Rate", icon: "🎯" },
                { number: "10hrs", label: "Total Duration", icon: "⏱️" },
                { number: "5", label: "Essential Problems", icon: "💡" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm text-center py-20 px-4 rounded-3xl border border-green-400/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-300 mt-3 max-w-2xl mx-auto mb-8">
            Join the ranks of successful engineers who landed their dream jobs through systematic, 
            AI-powered interview preparation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <Link href="/course-overview">
                <motion.button
                  className="relative bg-black/80 backdrop-blur-sm text-white px-12 py-6 rounded-2xl font-bold text-xl border border-green-400/50 group-hover:border-green-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning Today
                </motion.button>
              </Link>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <Link href="/syllabus">
                <motion.button
                  className="relative bg-black/80 backdrop-blur-sm text-white px-12 py-6 rounded-2xl font-bold text-xl border border-blue-400/50 group-hover:border-blue-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Syllabus
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-12 mt-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <p className="text-lg">MustSolve &copy; 2025. Transforming careers through essential interview preparation.</p>
            <div className="flex justify-center gap-8 mt-6">
              <Link href="/course-overview" className="text-green-400 hover:text-green-300 transition-colors">Course Overview</Link>
              <Link href="/syllabus" className="text-green-400 hover:text-green-300 transition-colors">Syllabus</Link>
              <Link href="/instructor" className="text-green-400 hover:text-green-300 transition-colors">Instructor</Link>
              <Link href="/modules" className="text-green-400 hover:text-green-300 transition-colors">Start Learning</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}