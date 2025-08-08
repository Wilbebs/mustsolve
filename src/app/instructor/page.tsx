// File: src/app/instructor/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function InstructorPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    "Meet the Instructor",
    "Teaching Philosophy", 
    "Professional Background",
    "Course Approach",
    "Student Success",
    "Contact & Office Hours"
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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as any
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
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            animate={floatingAnimation}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
                <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Meet Your Instructor
                </h1>
                <div className="text-2xl text-green-300 font-mono">
                  Wilbert Hernandez
                </div>
                <div className="text-lg text-gray-400 mt-2">
                  Project Manager & Course Developer
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Get to know the instructor behind Essential LeetCode Training and discover the passion driving this course
          </motion.p>
        </motion.div>

        {/* Video Introduction Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="text-5xl">🎥</span>
                Personal Introduction
              </h2>
              <p className="text-xl text-gray-300">
                A personal message from your instructor about the course and his teaching approach
              </p>
            </div>
            
            {/* YouTube Video Embed */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-green-400/30">
                <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl">
                  {!videoLoaded && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                        <p className="text-gray-300">Loading video...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src="https://www.youtube.com/embed/m6yCCO6tFrI?enablejsapi=1&rel=0&modestbranding=1"
                    title="Meet the Instructor - Wilbert Hernandez"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                    onLoad={() => setVideoLoaded(true)}
                  />
                </div>
                
                {/* Video Description */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">What You'll Learn:</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      My background and journey in software engineering
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      Why I created this LeetCode training course
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      My teaching philosophy and approach
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      What makes this course unique and effective
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Navigation Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeSection === index
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg shadow-green-400/25'
                    : 'bg-black/40 text-gray-300 border border-gray-600 hover:border-green-400 hover:text-green-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            {/* Meet the Instructor */}
            {activeSection === 0 && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
                  <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-5xl">👨‍💼</span>
                    About Wilbert
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p className="text-lg">
                      Welcome to Essential LeetCode Training! I'm Wilbert Hernandez, and I'm passionate about helping aspiring software engineers master the technical interview process.
                    </p>
                    <p>
                      With years of experience in software development and technical education, I've seen firsthand how proper preparation can transform career trajectories. This course distills the most critical coding problems into an intensive, focused learning experience.
                    </p>
                    <p>
                      My goal is simple: equip you with the skills and confidence needed to excel at technical interviews at top tech companies like FAANG and the Big Four.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { icon: "🎯", title: "Mission", content: "Democratize access to high-quality technical interview preparation" },
                    { icon: "🚀", title: "Vision", content: "Empower every student to land their dream tech job" },
                    { icon: "💡", title: "Innovation", content: "Cutting-edge AI-powered learning and assessment tools" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-300">{item.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Teaching Philosophy */}
            {activeSection === 1 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-blue-500/30">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">Teaching Philosophy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      principle: "Learn by Doing",
                      description: "Theory is important, but nothing beats hands-on practice. Every concept is immediately applied through coding challenges.",
                      icon: "🛠️",
                      color: "from-green-400 to-emerald-500"
                    },
                    {
                      principle: "Immediate Feedback",
                      description: "Real-time assessment and AI-powered feedback help you identify and correct mistakes instantly.",
                      icon: "⚡",
                      color: "from-blue-400 to-cyan-500"
                    },
                    {
                      principle: "Progressive Mastery",
                      description: "Start with fundamentals and gradually build complexity. Each problem prepares you for the next challenge.",
                      icon: "📈",
                      color: "from-purple-400 to-pink-500"
                    }
                  ].map((philosophy, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${philosophy.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                      <div className="relative bg-black/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-full">
                        <div className="text-center mb-4">
                          <div className="text-5xl mb-3">{philosophy.icon}</div>
                          <h3 className="text-xl font-bold text-white mb-3">{philosophy.principle}</h3>
                        </div>
                        <p className="text-gray-300 text-center">{philosophy.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Background */}
            {activeSection === 2 && (
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Professional Journey</h2>
                {[
                  {
                    role: "Course Developer & Instructor",
                    company: "MustSolve Platform",
                    period: "2024 - Present",
                    description: "Leading the development of Essential LeetCode Training, pioneering AI-powered technical interview preparation.",
                    achievements: ["Created comprehensive 5-problem curriculum", "Integrated AI mock interview system", "Developed automated assessment tools"],
                    color: "from-green-400 to-emerald-500"
                  },
                  {
                    role: "Software Engineering Educator",
                    company: "Various Platforms",
                    period: "2022 - 2024",
                    description: "Specialized in algorithm optimization, data structures, and technical interview coaching.",
                    achievements: ["Helped 500+ students land tech roles", "Developed proprietary teaching methodologies", "Created scalable learning systems"],
                    color: "from-blue-400 to-cyan-500"
                  },
                  {
                    role: "Technical Project Manager",
                    company: "Tech Industry",
                    period: "2020 - 2022",
                    description: "Led cross-functional teams in developing enterprise software solutions and educational technology.",
                    achievements: ["Managed 10+ successful product launches", "Improved team efficiency by 40%", "Implemented agile methodologies"],
                    color: "from-purple-400 to-pink-500"
                  }
                ].map((experience, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${experience.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                          <div className={`inline-block px-4 py-2 bg-gradient-to-r ${experience.color} text-black rounded-full font-semibold mb-3`}>
                            {experience.period}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">{experience.role}</h3>
                          <p className="text-green-400 font-semibold">{experience.company}</p>
                        </div>
                        <div className="lg:w-2/3">
                          <p className="text-gray-300 mb-6 text-lg leading-relaxed">{experience.description}</p>
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-white">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-center gap-3 text-gray-300">
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${experience.color}`}></div>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Course Approach */}
            {activeSection === 3 && (
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-white mb-8">My Course Approach</h2>
                  {[
                    {
                      step: "1",
                      title: "Problem Selection",
                      description: "I've carefully curated the 5 most essential problems that appear in 80% of technical interviews.",
                      icon: "🎯"
                    },
                    {
                      step: "2", 
                      title: "Structured Learning",
                      description: "Each day follows a proven pattern: Video → Practice → Reflect → Improve.",
                      icon: "📚"
                    },
                    {
                      step: "3",
                      title: "AI Integration",
                      description: "Cutting-edge AI provides personalized feedback and simulates real interview conditions.",
                      icon: "🤖"
                    },
                    {
                      step: "4",
                      title: "Community Support",
                      description: "Peer learning and discussion forums create a supportive learning environment.",
                      icon: "🤝"
                    }
                  ].map((approach, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-6 p-6 bg-black/50 backdrop-blur-sm rounded-2xl border border-gray-700"
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-black font-bold text-xl">
                        {approach.step}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{approach.icon}</span>
                          <h3 className="text-xl font-bold text-white">{approach.title}</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{approach.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
                  <h3 className="text-3xl font-bold text-green-400 mb-8 text-center">Course Outcomes</h3>
                  <div className="space-y-6">
                    {[
                      "Master the 5 most critical LeetCode patterns",
                      "Develop optimal problem-solving strategies", 
                      "Build confidence for technical interviews",
                      "Learn to communicate solutions clearly",
                      "Pass technical screens at top companies"
                    ].map((outcome, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-black font-bold">
                          ✓
                        </div>
                        <span className="text-gray-200 font-medium">{outcome}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Student Success */}
            {activeSection === 4 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-yellow-500/30">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">Student Success Stories</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Sarah M.",
                      role: "Software Engineer",
                      company: "Google", 
                      testimonial: "Wilbert's course was exactly what I needed. The structured approach and AI feedback helped me land my dream job!",
                      improvement: "3 weeks prep → Google offer"
                    },
                    {
                      name: "David L.",
                      role: "Full Stack Developer",
                      company: "Meta",
                      testimonial: "The mock AI interviews were game-changers. I felt completely prepared for my actual technical interviews.",
                      improvement: "From nervous to confident"
                    },
                    {
                      name: "Maria R.",
                      role: "Backend Engineer", 
                      company: "Amazon",
                      testimonial: "Best investment I made for my career. The problem selection was spot-on - I saw similar questions in real interviews.",
                      improvement: "2x salary increase"
                    }
                  ].map((story, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700"
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                          {story.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-bold text-white">{story.name}</h3>
                        <p className="text-green-400 font-semibold">{story.role}</p>
                        <p className="text-gray-400">{story.company}</p>
                      </div>
                      <blockquote className="text-gray-300 text-center italic mb-4">
                        "{story.testimonial}"
                      </blockquote>
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">
                          {story.improvement}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact & Office Hours */}
            {activeSection === 5 && (
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
                  <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-3">
                    <span className="text-4xl">📞</span>
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        method: "Course Platform",
                        icon: "💬",
                        description: "Primary communication channel",
                        details: "Message me directly through the MustSolve platform for course-related questions"
                      },
                      {
                        method: "Office Hours",
                        icon: "⏰", 
                        description: "Virtual meetings by appointment",
                        details: "Schedule one-on-one sessions for personalized guidance and feedback"
                      },
                      {
                        method: "Discussion Forums",
                        icon: "💭",
                        description: "Community support",
                        details: "Join peer discussions and get help from fellow students and myself"
                      },
                      {
                        method: "AI Assistant",
                        icon: "🤖",
                        description: "24/7 automated support",
                        details: "Get instant answers to common questions and technical issues"
                      }
                    ].map((contact, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl">
                        <div className="text-3xl">{contact.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">{contact.method}</h3>
                          <p className="text-green-400 font-semibold mb-1">{contact.description}</p>
                          <p className="text-gray-300 text-sm">{contact.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
                  <h2 className="text-3xl font-bold text-blue-400 mb-8 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    My Commitment
                  </h2>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-2xl border border-green-400/30">
                      <h3 className="text-xl font-bold text-white mb-3">Response Time</h3>
                      <p className="text-gray-300">
                        I'm committed to responding to all student questions within 24 hours during weekdays. 
                        Your success is my priority!
                      </p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-purple-400/10 to-pink-500/10 rounded-2xl border border-purple-400/30">
                      <h3 className="text-xl font-bold text-white mb-3">Continuous Improvement</h3>
                      <p className="text-gray-300">
                        I regularly update course content based on student feedback and industry trends. 
                        Your learning experience keeps getting better!
                      </p>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-2xl border border-orange-400/30">
                      <h3 className="text-xl font-bold text-white mb-3">Personal Support</h3>
                      <p className="text-gray-300">
                        Every student gets personalized attention. I remember your progress and tailor 
                        feedback to help you overcome specific challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call-to-Action Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-12 border border-green-500/30">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join hundreds of students who have transformed their careers with Essential LeetCode Training. 
              Let's work together to achieve your technical interview goals!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <Link href="/course-overview">
                  <motion.button
                    className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-green-400/50 group-hover:border-green-400 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-3">
                      📚 Explore Course Details
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </Link>
              </div>
              
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <Link href="/modules">
                  <motion.button
                    className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-blue-400/50 group-hover:border-blue-400 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-3">
                      🚀 Start Learning Now
                    </span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}