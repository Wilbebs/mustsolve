// File: src/app/syllabus/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SyllabusPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    "Course Schedule",
    "Learning Objectives", 
    "Assessment Plan",
    "Learning Resources",
    "Learning Activities",
    "Instructor Info"
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
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut" as const
        }
    };

  const dailySchedule = [
    {
      day: 1,
      duration: "120 min",
      problem: "Two Sum",
      topic: "Arrays & Hash Maps",
      resources: "Starter video: Arrays & Hash Maps",
      activities: [
        "Watch starter video (15 min)",
        "Live-coded walkthrough (15 min)", 
        "Individual solve on LeetCode (60 min)",
        "Reflection post (15 min)"
      ],
      deliverable: "HW #1 submission",
      difficulty: "Essential",
      color: "from-green-400 to-emerald-500"
    },
    {
      day: 2,
      duration: "120 min",
      problem: "Add Two Numbers",
      topic: "Linked Lists",
      resources: "Video: Pointers & Complexity",
      activities: [
        "Watch instructional video (15 min)",
        "Live-coded walkthrough (15 min)",
        "Individual solve on LeetCode (60 min)", 
        "Reflection post (15 min)"
      ],
      deliverable: "HW #2 submission",
      difficulty: "Essential",
      color: "from-blue-400 to-cyan-500"
    },
    {
      day: 3,
      duration: "120 min", 
      problem: "Valid Parentheses",
      topic: "Stacks",
      resources: "Video: Stacks vs Recursion",
      activities: [
        "Watch instructional video (15 min)",
        "Live-coded walkthrough (15 min)",
        "Individual solve on LeetCode (60 min)",
        "Reflection post (15 min)"
      ],
      deliverable: "HW #3 submission", 
      difficulty: "Essential",
      color: "from-purple-400 to-pink-500"
    },
    {
      day: 4,
      duration: "120 min",
      problem: "Merge Two Sorted Lists", 
      topic: "Advanced Linked Lists",
      resources: "Video: Iterative vs Recursive merge",
      activities: [
        "Watch instructional video (15 min)",
        "Live-coded walkthrough (15 min)",
        "Individual solve on LeetCode (60 min)",
        "Reflection post (15 min)" 
      ],
      deliverable: "HW #4 submission",
      difficulty: "Essential", 
      color: "from-orange-400 to-red-500"
    },
    {
      day: 5,
      duration: "120 min",
      problem: "Binary Tree Level Order Traversal",
      topic: "Trees & BFS/DFS", 
      resources: "Video: BFS vs DFS",
      activities: [
        "Watch video (15 min)",
        "Solve problem (60 min)",
        "Mock-AI interview quiz (30 min)",
        "Course survey (15 min)"
      ],
      deliverable: "HW #5 & Quiz #5",
      difficulty: "Essential",
      color: "from-indigo-400 to-purple-500"
    }
  ];

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
                  Course Syllabus
                </h1>
                <div className="text-2xl text-green-300 font-mono">
                  EME4320 - Essential LeetCode Training
                </div>
                <div className="text-lg text-gray-400 mt-2">
                  Project Manager & Instructor: Wilbert Hernandez
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A comprehensive 10-hour micro-course covering the 5 most essential LeetCode problems for technical interviews
          </motion.p>
        </motion.div>

        {/* Download PDF Section */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 inline-block">
            <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3 justify-center">
              <span className="text-3xl">📄</span>
              Official Syllabus Document
            </h3>
            <p className="text-gray-300 mb-4">Download the complete syllabus as a PDF for offline reference</p>
            <a 
                href="/MustSolve-Syllabus.pdf" 
                download="MustSolve-Syllabus.pdf"
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-8 py-3 rounded-full font-bold hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-green-400/25"
            >
            📥 Download Syllabus PDF
            </a>
          </div>
        </motion.div>

        {/* Interactive Navigation Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
            {/* Course Schedule */}
            {activeSection === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">5-Day Course Schedule</h2>
                  <p className="text-xl text-gray-300">Each day: 120 minutes | Total: 10 hours</p>
                </div>
                
                {dailySchedule.map((day, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredDay(index)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${day.color} rounded-2xl blur-xl opacity-${hoveredDay === index ? '40' : '20'} transition-opacity duration-300`}></div>
                    <div className="relative bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                      <div className="grid lg:grid-cols-4 gap-6">
                        {/* Day Header */}
                        <div className="lg:col-span-1">
                          <div className="text-center lg:text-left">
                            <div className={`inline-block px-4 py-2 bg-gradient-to-r ${day.color} text-black rounded-full font-bold text-xl mb-3`}>
                              Day {day.day}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{day.problem}</h3>
                            <p className="text-gray-400 font-mono text-lg">{day.duration}</p>
                            <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm mt-3">
                              {day.difficulty}
                            </div>
                          </div>
                        </div>
                        
                        {/* Topic & Resources */}
                        <div className="lg:col-span-1">
                          <h4 className="text-lg font-semibold text-green-400 mb-3">Topic & Resources</h4>
                          <p className="text-white font-semibold mb-2">{day.topic}</p>
                          <p className="text-gray-300 text-sm mb-4">{day.resources}</p>
                          <div className={`inline-block px-3 py-1 bg-gradient-to-r ${day.color} bg-opacity-20 text-white rounded-full text-sm`}>
                            {day.deliverable}
                          </div>
                        </div>
                        
                        {/* Activities */}
                        <div className="lg:col-span-2">
                          <h4 className="text-lg font-semibold text-blue-400 mb-3">Daily Activities</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {day.activities.map((activity, actIndex) => (
                              <div key={actIndex} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${day.color} mt-1.5`}></div>
                                <span className="text-gray-200 text-sm">{activity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Learning Objectives */}
            {activeSection === 1 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-blue-500/30">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">General Module Objectives</h2>
                <div className="grid md:grid-cols-1 gap-6">
                  {[
                    { 
                      letter: "A",
                      objective: "Apply optimal data-structure selection to solve each essential LeetCode problem in O(n log n) or better.",
                      icon: "⚡",
                      color: "from-yellow-400 to-orange-500"
                    },
                    { 
                      letter: "B", 
                      objective: "Analyze multiple solution patterns (brute-force vs optimized) and compare their time/space complexities.",
                      icon: "🔍", 
                      color: "from-blue-400 to-cyan-500"
                    },
                    { 
                      letter: "C",
                      objective: "Create clean, production-quality code that passes all LeetCode test cases without runtime errors.",
                      icon: "✨",
                      color: "from-green-400 to-emerald-500" 
                    },
                    { 
                      letter: "D",
                      objective: "Evaluate one's own and peers' solutions against industry-standard readability and efficiency criteria.",
                      icon: "📊",
                      color: "from-purple-400 to-pink-500"
                    },
                    { 
                      letter: "E",
                      objective: "Demonstrate interview-ready communication by articulating problem-solving steps in mock AI-driven interviews.",
                      icon: "🎤", 
                      color: "from-red-400 to-rose-500"
                    }
                  ].map((obj, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-6 p-6 bg-gray-800/40 rounded-2xl border border-gray-700"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${obj.color} rounded-xl flex items-center justify-center text-black font-bold text-2xl`}>
                        {obj.letter}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{obj.icon}</span>
                          <span className="text-lg font-semibold text-white">Objective {obj.letter}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{obj.objective}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Plan */}
            {activeSection === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Assessment Plan</h2>
                  <p className="text-xl text-gray-300">Two-part evaluation system for comprehensive skill assessment</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {[
                    {
                      type: "Homeworks (5)",
                      weight: "50%",
                      nature: "Formative",
                      criteria: "Auto-graded Leetcode submissions",
                      requirement: "All tests pass (100%)",
                      icon: "💻",
                      color: "from-green-400 to-emerald-500",
                      details: [
                        "One homework per day (5 total)",
                        "Submit directly to LeetCode platform", 
                        "Automatic grading system",
                        "Must pass all test cases",
                        "Immediate feedback provided"
                      ]
                    },
                    {
                      type: "Quizzes (Mock Interviews)",
                      weight: "50%", 
                      nature: "Summative",
                      criteria: "Oral Q&A + Verbal Explanation",
                      requirement: "Clarity + Optimal Big-O Identified (100%)",
                      icon: "🎤",
                      color: "from-blue-400 to-cyan-500",
                      details: [
                        "AI-powered mock interviews",
                        "Verbal explanation of solutions",
                        "Follow-up clarifying questions",
                        "Big-O complexity identification", 
                        "Communication skills evaluation"
                      ]
                    }
                  ].map((assessment, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${assessment.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                      <div className="relative bg-black/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 h-full">
                        <div className="text-center mb-6">
                          <div className="text-6xl mb-4">{assessment.icon}</div>
                          <div className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">
                            {assessment.weight}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{assessment.type}</h3>
                          <div className={`inline-block px-3 py-1 bg-gradient-to-r ${assessment.color} bg-opacity-20 text-white rounded-full text-sm mb-3`}>
                            {assessment.nature}
                          </div>
                          <p className="text-gray-300 mb-2">{assessment.criteria}</p>
                          <p className="text-sm text-green-300 font-semibold">{assessment.requirement}</p>
                        </div>
                        <ul className="space-y-3">
                          {assessment.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-3 text-gray-300">
                              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${assessment.color}`}></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Learning Resources */}
            {activeSection === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Learning Resources</h2>
                  <p className="text-xl text-gray-300">Comprehensive materials to support your learning journey</p>
                </div>
                
                {[
                  {
                    resource: "LeetCode Walkthrough Videos",
                    purpose: "Excellent tutorials that teach theory, patterns, and complexity before hands-on solving.",
                    icon: "🎥",
                    color: "from-red-400 to-pink-500",
                    features: ["Step-by-step explanations", "Pattern recognition", "Complexity analysis", "Best practices"]
                  },
                  {
                    resource: "LeetCode Problem Pages", 
                    purpose: "Authentic coding environments with real-world, interview-like problems to be solved. Automated test-cases to track student progress.",
                    icon: "💻",
                    color: "from-green-400 to-emerald-500",
                    features: ["Interactive coding environment", "Automated testing", "Progress tracking", "Community discussions"]
                  },
                  {
                    resource: "Data-Structure Reference Sheets",
                    purpose: "Quick-access tables of operations and complexities. Useful guidance for proper-use of Data-structures and Algorithms.",
                    icon: "📊", 
                    color: "from-blue-400 to-cyan-500",
                    features: ["Complexity cheat sheets", "Operation references", "Best use cases", "Performance comparisons"]
                  },
                  {
                    resource: "MustSolve Web App (Next.js + Tailwind CSS)",
                    purpose: "Central hub housing syllabus, links, reflection prompts and auto-graded mock interviews.",
                    icon: "🌐",
                    color: "from-purple-400 to-indigo-500", 
                    features: ["Centralized access", "Progress dashboard", "Reflection tools", "Mock interviews"]
                  },
                  {
                    resource: "Mock-AI Interview Tool (GPT-based)",
                    purpose: "Simulate interviewer follow-ups; records speed, complexity explanation, and code cleanliness.",
                    icon: "🤖",
                    color: "from-orange-400 to-red-500",
                    features: ["AI-powered interviews", "Performance analytics", "Real-time feedback", "Communication assessment"]
                  }
                ].map((resource, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${resource.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                      <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center text-3xl`}>
                          {resource.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-3">{resource.resource}</h3>
                          <p className="text-gray-300 mb-6 leading-relaxed">{resource.purpose}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {resource.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${resource.color}`}></div>
                                <span className="text-gray-200 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Learning Activities */}
            {activeSection === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Learning Activities</h2>
                  <p className="text-xl text-gray-300">Structured activities designed to maximize learning and retention</p>
                </div>
                
                {[
                  {
                    activity: "Watch Practice Reflect Loop",
                    description: "Each day begins with a concise video, flows into a timed LeetCode solve, and ends with a short reflection post (What Data Structure should you use? Why this complexity? What would you improve?).",
                    icon: "🔄",
                    color: "from-green-400 to-emerald-500",
                    steps: ["Watch instructional video", "Practice timed solving", "Write reflection post", "Self-assessment"]
                  },
                  {
                    activity: "Guided Code Reviews", 
                    description: "After submission, learners compare against annotated sample solutions and other user's solutions.",
                    icon: "🔍",
                    color: "from-blue-400 to-cyan-500",
                    steps: ["Submit solution", "Review sample code", "Compare approaches", "Identify improvements"]
                  },
                  {
                    activity: "Peer Discussion Board",
                    description: "Students post complexity analyses; peers must respond with one improvement suggestion.",
                    icon: "💬", 
                    color: "from-purple-400 to-pink-500",
                    steps: ["Post complexity analysis", "Review peer solutions", "Provide feedback", "Engage in discussions"]
                  },
                  {
                    activity: "Mock-AI Interviews",
                    description: "Vercel or AWS hosted bot asks clarifying questions; learners answer verbally/on-screen for a 5-min 'quiz.'",
                    icon: "🎤",
                    color: "from-orange-400 to-red-500", 
                    steps: ["Join AI interview session", "Answer verbal questions", "Explain solution approach", "Receive performance feedback"]
                  }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${activity.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3 text-center lg:text-left">
                          <div className={`inline-block w-20 h-20 bg-gradient-to-r ${activity.color} rounded-2xl flex items-center justify-center text-4xl mb-4`}>
                            {activity.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{activity.activity}</h3>
                        </div>
                        <div className="lg:w-2/3">
                          <p className="text-gray-300 mb-6 leading-relaxed text-lg">{activity.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            {activity.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                <div className={`w-8 h-8 bg-gradient-to-r ${activity.color} rounded-full flex items-center justify-center text-black font-bold text-sm`}>
                                  {stepIndex + 1}
                                </div>
                                <span className="text-gray-200">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Instructor Info */}
            {activeSection === 5 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-green-500/30">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Instructor Information</h2>
                  <p className="text-xl text-gray-300">Meet your course instructor and project manager</p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Profile Section */}
                    <div className="lg:w-1/3 text-center">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative w-48 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border-4 border-green-400/30 flex items-center justify-center text-6xl">
                          👨‍💼
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2">Wilbert Hernandez</h3>
                      <p className="text-xl text-green-400 mb-4">Project Manager & Instructor</p>
                      <div className="inline-block px-4 py-2 bg-green-500/20 text-green-300 rounded-full">
                        EME4320 Course Lead
                      </div>
                    </div>
                    
                    {/* Details Section */}
                    <div className="lg:w-2/3">
                      <div className="grid gap-6">
                        {[
                          {
                            title: "Course Leadership",
                            content: "Leading the development and instruction of EME4320 - Essential LeetCode Training, a specialized micro-course for technical interview preparation.",
                            icon: "🎯"
                          },
                          {
                            title: "Expertise Areas",
                            content: "Algorithm optimization, data structures, technical interview coaching, and educational technology integration with platforms like LeetCode and AI-powered assessment tools.",
                            icon: "💡"
                          },
                          {
                            title: "Teaching Philosophy", 
                            content: "Focused on practical, hands-on learning through real coding challenges, immediate feedback, and industry-relevant problem-solving techniques that directly translate to career success.",
                            icon: "📚"
                          },
                          {
                            title: "Course Innovation",
                            content: "Pioneering the integration of AI-powered mock interviews and automated assessment systems to provide students with realistic interview preparation and immediate performance feedback.",
                            icon: "🚀"
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-6 bg-gray-800/40 rounded-2xl border border-gray-700">
                            <div className="text-3xl">{item.icon}</div>
                            <div>
                              <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                              <p className="text-gray-300 leading-relaxed">{item.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Contact Information */}
                      <div className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                        <h4 className="text-xl font-semibold text-green-400 mb-4">Office Hours & Contact</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📧</span>
                            <div>
                              <p className="text-white font-medium">Email</p>
                              <p className="text-gray-300 text-sm">Available via course platform</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">⏰</span>
                            <div>
                              <p className="text-white font-medium">Office Hours</p>
                              <p className="text-gray-300 text-sm">By appointment</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">💬</span>
                            <div>
                              <p className="text-white font-medium">Discussion Forum</p>
                              <p className="text-gray-300 text-sm">Active daily support</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🎥</span>
                            <div>
                              <p className="text-white font-medium">Video Sessions</p>
                              <p className="text-gray-300 text-sm">Live Q&A available</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Footer */}
        <motion.div 
          className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <Link href="/course-overview">
              <motion.button
                className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-blue-400/50 group-hover:border-blue-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  ← Back to Course Overview
                </span>
              </motion.button>
            </Link>
          </div>
          
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <Link href="/modules">
              <motion.button
                className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-green-400/50 group-hover:border-green-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  📚 Start Learning Modules
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
        </motion.div>
      </div>
    </div>
  );
}