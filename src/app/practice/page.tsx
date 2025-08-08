// File: src/app/practice/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const PracticePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [hoveredProblem, setHoveredProblem] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const problemCategories = [
    {
      id: 'arrays-hashing',
      name: 'Arrays & Hashing',
      total: 9,
      completed: 1,
      color: 'from-green-400 to-emerald-500',
      problems: [
        { id: 1, name: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', completed: true, status: 'available' },
        { id: 2, name: 'Contains Duplicate', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 3, name: 'Valid Anagram', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 4, name: 'Group Anagrams', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 5, name: 'Top K Frequent Elements', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 6, name: 'Product of Array Except Self', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 7, name: 'Valid Sudoku', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 8, name: 'Longest Consecutive Sequence', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 9, name: 'Trapping Rain Water', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    },
    {
      id: 'two-pointers',
      name: 'Two Pointers',
      total: 5,
      completed: 0,
      color: 'from-blue-400 to-cyan-500',
      problems: [
        { id: 10, name: 'Valid Palindrome', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 11, name: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 12, name: '3Sum', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 13, name: 'Container With Most Water', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 14, name: 'Trapping Rain Water', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      total: 6,
      completed: 0,
      color: 'from-purple-400 to-pink-500',
      problems: [
        { id: 15, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 16, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 17, name: 'Longest Repeating Character Replacement', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 18, name: 'Permutation in String', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 19, name: 'Minimum Window Substring', difficulty: 'Hard', completed: false, status: 'locked' },
        { id: 20, name: 'Sliding Window Maximum', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    },
    {
      id: 'stack',
      name: 'Stack',
      total: 7,
      completed: 0,
      color: 'from-orange-400 to-red-500',
      problems: [
        { id: 21, name: 'Valid Parentheses', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 22, name: 'Min Stack', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 23, name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 24, name: 'Generate Parentheses', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 25, name: 'Daily Temperatures', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 26, name: 'Car Fleet', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 27, name: 'Largest Rectangle in Histogram', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      total: 7,
      completed: 0,
      color: 'from-indigo-400 to-purple-500',
      problems: [
        { id: 28, name: 'Binary Search', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 29, name: 'Search a 2D Matrix', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 30, name: 'Koko Eating Bananas', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 31, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 32, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 33, name: 'Time Based Key-Value Store', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 34, name: 'Median of Two Sorted Arrays', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      total: 11,
      completed: 0,
      color: 'from-teal-400 to-cyan-500',
      problems: [
        { id: 35, name: 'Reverse Linked List', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 36, name: 'Merge Two Sorted Lists', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 37, name: 'Reorder List', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 38, name: 'Remove Nth Node From End of List', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 39, name: 'Copy List with Random Pointer', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 40, name: 'Add Two Numbers', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 41, name: 'Linked List Cycle', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 42, name: 'Find the Duplicate Number', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 43, name: 'LRU Cache', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 44, name: 'Merge k Sorted Lists', difficulty: 'Hard', completed: false, status: 'locked' },
        { id: 45, name: 'Reverse Nodes in k-Group', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    },
    {
      id: 'trees',
      name: 'Trees',
      total: 15,
      completed: 0,
      color: 'from-yellow-400 to-orange-500',
      problems: [
        { id: 46, name: 'Invert Binary Tree', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 47, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 48, name: 'Diameter of Binary Tree', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 49, name: 'Balanced Binary Tree', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 50, name: 'Same Tree', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 51, name: 'Subtree of Another Tree', difficulty: 'Easy', completed: false, status: 'locked' },
        { id: 52, name: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 53, name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 54, name: 'Binary Tree Right Side View', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 55, name: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 56, name: 'Validate Binary Search Tree', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 57, name: 'Kth Smallest Element in a BST', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 58, name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', completed: false, status: 'locked' },
        { id: 59, name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', completed: false, status: 'locked' },
        { id: 60, name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', completed: false, status: 'locked' },
      ]
    }
  ];

  const filteredCategories = problemCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.problems.some(problem => 
      problem.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    return (completed / total) * 100;
  };

  const getProblemSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
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
                  Practice Problems
                </h1>
                <div className="text-2xl text-green-300 font-mono">
                  Structured Learning Path
                </div>
                <div className="text-lg text-gray-400 mt-2">
                  Solve curated problems and track your progress
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
                {/* Search Bar */}
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
                
                {/* Difficulty Filter */}
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
                  onClick={() => toggleCategory(category.id)}
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
                          className={`flex items-center justify-between p-4 hover:bg-gray-800/30 transition-colors border-b border-gray-800 last:border-b-0 ${
                            problem.status === 'locked' ? 'opacity-60' : 'cursor-pointer'
                          }`}
                          whileHover={problem.status === 'available' ? { x: 10 } : {}}
                          onHoverStart={() => setHoveredProblem(problem.id)}
                          onHoverEnd={() => setHoveredProblem(null)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                              problem.completed 
                                ? `bg-gradient-to-r ${category.color} border-transparent` 
                                : problem.status === 'available'
                                ? 'border-green-400'
                                : 'border-gray-600'
                            }`}>
                              {problem.completed ? (
                                <div className="text-black font-bold">✓</div>
                              ) : problem.status === 'locked' ? (
                                <div className="text-gray-500 text-sm">🔒</div>
                              ) : (
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                              )}
                            </div>
                            {problem.status === 'available' ? (
                              <Link href={`/problems/${getProblemSlug(problem.name)}`}>
                                <span className="text-white font-medium hover:text-green-400 transition-colors">
                                  {problem.name}
                                </span>
                              </Link>
                            ) : (
                              <span className="text-gray-400 font-medium">
                                {problem.name}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                            {problem.status === 'available' && (
                              <div className={`text-green-400 transition-transform ${
                                hoveredProblem === problem.id ? 'translate-x-1' : ''
                              }`}>
                                →
                              </div>
                            )}
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
              value: problemCategories.reduce((sum, cat) => sum + cat.completed, 0),
              icon: "🎯",
              color: "from-green-400 to-emerald-500"
            },
            { 
              title: "Total Problems", 
              value: problemCategories.reduce((sum, cat) => sum + cat.total, 0),
              icon: "📚",
              color: "from-blue-400 to-cyan-500"
            },
            { 
              title: "Completion Rate", 
              value: `${Math.round(
                (problemCategories.reduce((sum, cat) => sum + cat.completed, 0) /
                 problemCategories.reduce((sum, cat) => sum + cat.total, 0)) * 100
              )}%`,
              icon: "📊",
              color: "from-purple-400 to-pink-500"
            },
            { 
              title: "Categories", 
              value: problemCategories.length,
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