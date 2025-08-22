// File: src/app/practice/page.tsx - Database-driven version

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePracticeData } from '@/hooks/useApi';

const PracticePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);

  // API data fetching
  const filters = {
    ...(selectedDifficulty !== 'all' && { difficulty: selectedDifficulty }),
    ...(searchTerm && { search: searchTerm })
  };

  const { categories, stats, loading, error, refetch } = usePracticeData(filters);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.problems.some(problem => 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    if (total === 0) return 0;
    return (completed / total) * 100;
  };

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
      ease: "easeInOut" as const
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-400 text-lg">Loading problems from database...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Database Connection Error</h2>
          <p className="text-gray-300 mb-4">Failed to load problems from the database.</p>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 border border-green-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 border-2 border-green-500/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-green-300/20 rotate-12 animate-bounce-slow"></div>
        
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
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
                  Practice Problems
                </h1>
                <div className="text-2xl text-green-300 font-mono">
                  Database-Driven Learning
                </div>
                <div className="text-lg text-gray-400 mt-2">
                  Real problems from PostgreSQL database
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Master data structures and algorithms through progressive problem-solving across different categories
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="h-5 w-5 text-gray-400">🔍</div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:w-48">
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problem Categories */}
        <motion.div 
          className="space-y-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCategories.map((category, index) => (
            <motion.div 
              key={category.id} 
              className="relative group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
                {/* Category Header */}
                <div
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-800/30 transition-colors"
                  onClick={() => toggleCategory(category.id.toString())}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {expandedCategories[category.id] ? (
                        <div className="w-6 h-6 text-green-400">▼</div>
                      ) : (
                        <div className="w-6 h-6 text-green-400">▶</div>
                      )}
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-black font-bold text-lg`}>
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                      <span className="text-gray-400">
                        {category.completed} / {category.total} completed
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-32">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${getProgressPercentage(category.completed, category.total)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {Math.round(getProgressPercentage(category.completed, category.total))}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problems List */}
                <AnimatePresence>
                  {expandedCategories[category.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-700"
                    >
                      {category.problems
                        .filter(problem => 
                          selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty
                        )
                        .map((problem, problemIndex) => (
                        <motion.div
                          key={problem.id}
                          className="flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors border-b border-gray-800 last:border-b-0 cursor-pointer"
                          whileHover={{ x: 10 }}
                          onHoverStart={() => setHoveredProblem(problem.id)}
                          onHoverEnd={() => setHoveredProblem(null)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              problem.completed 
                                ? `bg-gradient-to-r ${category.color} border-transparent` 
                                : 'border-green-400'
                            }`}>
                              {problem.completed ? (
                                <div className="text-black font-bold">✓</div>
                              ) : (
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                              )}
                            </div>
                            <Link href={`/problems/${problem.slug}`}>
                              <span className="text-white font-medium hover:text-green-400 transition-colors">
                                {problem.title}
                              </span>
                            </Link>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            <div className={`text-green-400 transition-transform ${
                              hoveredProblem === problem.id ? 'translate-x-1' : ''
                            }`}>
                              →
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { 
              title: "Problems Solved", 
              value: categories.reduce((sum, cat) => sum + cat.completed, 0),
              icon: "🎯",
              color: "from-green-400 to-emerald-500"
            },
            { 
              title: "Total Problems", 
              value: stats.totalProblems,
              icon: "📚",
              color: "from-blue-400 to-cyan-500"
            },
            { 
              title: "Easy Problems", 
              value: stats.easyCount,
              icon: "🟢",
              color: "from-green-400 to-green-500"
            },
            { 
              title: "Categories", 
              value: stats.totalCategories,
              icon: "🗂️",
              color: "from-orange-400 to-red-500"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.title}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PracticePage;