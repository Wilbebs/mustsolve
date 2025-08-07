'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseOverviewPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    "Course Description",
    "Learning Objectives", 
    "Course Structure",
    "Assessment Overview",
    "Prerequisites",
    "Course Outcomes"
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
            animate={{
                y: [0, -10, 0],
                transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
              <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
                <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Course Overview
                </h1>
                <div className="text-2xl text-green-300 font-mono">
                  MustSolve - Essential Leetcode Training
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Master the art of problem-solving through cutting-edge algorithmic challenges and engineering design principles
          </motion.p>
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
            {/* Course Description */}
            {activeSection === 0 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/30 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl">🎯</span>
                      Course Mission
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                      A ten-hour online micro-course that walks learners through the five most-asked LeetCode problems every software-engineering candidate should master to excel in technical interviews at top tech companies such as FAANG or the Big Four.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      Designed for upper-division computer science majors (or recent grads) preparing for technical interviews; familiar with at least one programming language (Java, Python, C++), but lacking structured interview-prep experience.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-green-400/30">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚀</div>
                        <h3 className="text-2xl font-bold text-green-400 mb-2">FAANG Interview Ready</h3>
                        <p className="text-gray-300">Master the 5 most essential LeetCode problems for technical interviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Objectives */}
            {activeSection === 1 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: "⚡", title: "Optimal Solutions", skills: ["Apply optimal data-structure selection", "Solve problems in O(n log n) or better", "Master essential LeetCode patterns", "Compare brute-force vs optimized approaches"], color: "from-blue-400 to-cyan-400" },
                  { icon: "🧠", title: "Code Quality", skills: ["Create production-quality code", "Pass all LeetCode test cases", "Write clean, readable solutions", "Analyze time/space complexities"], color: "from-purple-400 to-pink-400" },
                  { icon: "🎯", title: "Interview Skills", skills: ["Articulate problem-solving steps", "Demonstrate interview communication", "Handle mock AI-driven interviews", "Evaluate solutions against industry standards"], color: "from-green-400 to-emerald-400" }
                ].map((objective, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${objective.color} rounded-2xl blur-xl opacity-30 transition-opacity duration-300`}></div>
                    <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
                      <div className="text-5xl mb-4 text-center">{objective.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">{objective.title}</h3>
                      <ul className="space-y-3">
                        {objective.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center gap-3 text-gray-300">
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${objective.color}`}></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Course Structure */}
            {activeSection === 2 && (
              <div className="space-y-8">
                {[
                  { day: "Day 1", title: "Two Sum", duration: "120 min", description: "Arrays & Hash Maps - Master the most fundamental interview problem", topics: ["Starter video: Arrays & Hash Maps", "Live-coded walkthrough", "Individual solve on LeetCode", "Reflection post"], difficulty: "Essential", color: "green" },
                  { day: "Day 2", title: "Add Two Numbers", duration: "120 min", description: "Linked Lists - Learn pointer manipulation and complexity analysis", topics: ["Video: Pointers & Complexity", "Live-coded walkthrough", "Individual solve on LeetCode", "Reflection post"], difficulty: "Essential", color: "blue" },
                  { day: "Day 3", title: "Valid Parentheses", duration: "120 min", description: "Stacks - Understanding stack data structure applications", topics: ["Video: Stacks vs Recursion", "Live-coded walkthrough", "Individual solve on LeetCode", "Reflection post"], difficulty: "Essential", color: "purple" },
                  { day: "Day 4", title: "Merge Two Sorted Lists", duration: "120 min", description: "Advanced Linked Lists - Iterative vs recursive approaches", topics: ["Video: Iterative vs Recursive merge", "Live-coded walkthrough", "Individual solve on LeetCode", "Reflection post"], difficulty: "Essential", color: "green" },
                  { day: "Day 5", title: "Binary Tree Level Order Traversal", duration: "120 min", description: "Trees - BFS vs DFS with mock AI interview practice", topics: ["Video: BFS vs DFS", "Individual solve on LeetCode", "Mock-AI interview quiz", "Course survey"], difficulty: "Essential", color: "blue" }
                ].map((day, index) => (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                        <div className="lg:w-1/3">
                          <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-full font-semibold mb-3">
                            {day.day}
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-2">{day.title}</h3>
                          <p className="text-gray-400 font-mono">{day.duration}</p>
                          <div className="inline-block px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm mt-3">
                            {day.difficulty}
                          </div>
                        </div>
                        <div className="lg:w-2/3">
                          <p className="text-gray-300 mb-6 text-lg">{day.description}</p>
                          <div className="grid grid-cols-1 gap-4">
                            {day.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="text-gray-200">{topic}</span>
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

            {/* Assessment Overview */}
            {activeSection === 3 && (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">Assessment Breakdown</h2>
                  <p className="text-xl text-gray-300">Your progress measured through hands-on coding and interview practice</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {[
                    { percentage: 50, title: "Homework Assignments", description: "Formative auto-graded LeetCode submissions", icon: "💻", details: ["All tests pass (100%)", "5 essential problems", "Auto-graded submissions", "Immediate feedback"] },
                    { percentage: 50, title: "Mock AI Interviews", description: "Summative oral Q&A with verbal explanations", icon: "🎤", details: ["Clarity of explanation", "Optimal Big-O identified", "Follow-up question handling", "Interview communication skills"] }
                  ].map((assessment, index) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <div className="relative bg-black/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 h-full">
                        <div className="text-center mb-6">
                          <div className="text-6xl mb-4">{assessment.icon}</div>
                          <div className="text-5xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">
                            {assessment.percentage}%
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">{assessment.title}</h3>
                          <p className="text-gray-300">{assessment.description}</p>
                        </div>
                        <ul className="space-y-3">
                          {assessment.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-3 text-gray-300">
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></span>
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

            {/* Prerequisites */}
            {activeSection === 4 && (
              <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-yellow-500/30">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                  <span className="text-5xl">⚡</span>
                  Prerequisites & Target Audience
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Target Audience</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        Upper-division computer science majors
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        Recent graduates preparing for tech interviews
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        Students lacking structured interview-prep experience
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        Candidates targeting FAANG or Big Four companies
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-green-400 mb-4">Required Skills</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Familiarity with Java, Python, or C++
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Basic understanding of data structures
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Willingness to dedicate 10 hours total
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        Motivation to excel in technical interviews
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Course Outcomes */}
            {activeSection === 5 && (
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-12">Why LeetCode? Career Impact</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: "📈", title: "Career Impact", description: "Top tech companies filter 60% of applicants via coding screens" },
                    { icon: "🧩", title: "Transferable Thinking", description: "Strengthens debugging, refactoring, and system design" },
                    { icon: "🏆", title: "Competitive Edge", description: "Disciplined prep differentiates similar candidates" },
                    { icon: "🌟", title: "Community Learning", description: "LeetCode's leaderboards foster peer motivation" }
                  ].map((outcome, index) => (
                    <motion.div
                      key={index}
                      className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-4xl mb-4">{outcome.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{outcome.title}</h3>
                      <p className="text-gray-300 text-sm">{outcome.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 mt-12">
                  <h3 className="text-3xl font-bold text-green-400 mb-6">Future Scope</h3>
                  <p className="text-gray-300 text-lg mb-6">
                    This MVP covers the 5 essential problems. Future iterations will expand to include:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🎯</div>
                      <h4 className="text-lg font-semibold text-white mb-2">30-Problem Track</h4>
                      <p className="text-gray-400 text-sm">Comprehensive "must-know" problems with adaptive difficulty</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-3">🤖</div>
                      <h4 className="text-lg font-semibold text-white mb-2">Enhanced AI Interviews</h4>
                      <p className="text-gray-400 text-sm">Advanced mock interviews with behavioral questions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-3">📊</div>
                      <h4 className="text-lg font-semibold text-white mb-2">Recruiter Dashboard</h4>
                      <p className="text-gray-400 text-sm">Verify timed scores and code quality metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call-to-Action Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            <Link href="/syllabus">
              <motion.button
                className="relative bg-black/80 backdrop-blur-sm text-white px-12 py-6 rounded-2xl font-bold text-xl border border-green-400/50 group-hover:border-green-400 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  📋 View Detailed Syllabus
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </Link>
          </div>
          <p className="text-gray-400 mt-4">Ready to dive deeper? Check out the complete course schedule and assignments!</p>
        </motion.div>
      </div>
    </div>
  );
}