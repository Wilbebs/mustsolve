// File: src/app/practice/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { problems } from '@/data/problem';

const PracticePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const problemCategories = [
    {
      id: 'arrays-hashing',
      name: 'Arrays & Hashing',
      total: 9,
      completed: 0,
      problems: [
        { id: 1, name: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', completed: false },
        { id: 2, name: 'Contains Duplicate', difficulty: 'Easy', completed: false },
        { id: 3, name: 'Valid Anagram', difficulty: 'Easy', completed: false },
        { id: 4, name: 'Group Anagrams', difficulty: 'Medium', completed: false },
        { id: 5, name: 'Top K Frequent Elements', difficulty: 'Medium', completed: false },
        { id: 6, name: 'Product of Array Except Self', difficulty: 'Medium', completed: false },
        { id: 7, name: 'Valid Sudoku', difficulty: 'Medium', completed: false },
        { id: 8, name: 'Longest Consecutive Sequence', difficulty: 'Medium', completed: false },
        { id: 9, name: 'Trapping Rain Water', difficulty: 'Hard', completed: false },
      ]
    },
    {
      id: 'two-pointers',
      name: 'Two Pointers',
      total: 5,
      completed: 0,
      problems: [
        { id: 10, name: 'Valid Palindrome', difficulty: 'Easy', completed: false },
        { id: 11, name: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', completed: false },
        { id: 12, name: '3Sum', difficulty: 'Medium', completed: false },
        { id: 13, name: 'Container With Most Water', difficulty: 'Medium', completed: false },
        { id: 14, name: 'Trapping Rain Water', difficulty: 'Hard', completed: false },
      ]
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      total: 6,
      completed: 0,
      problems: [
        { id: 15, name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', completed: false },
        { id: 16, name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', completed: false },
        { id: 17, name: 'Longest Repeating Character Replacement', difficulty: 'Medium', completed: false },
        { id: 18, name: 'Permutation in String', difficulty: 'Medium', completed: false },
        { id: 19, name: 'Minimum Window Substring', difficulty: 'Hard', completed: false },
        { id: 20, name: 'Sliding Window Maximum', difficulty: 'Hard', completed: false },
      ]
    },
    {
      id: 'stack',
      name: 'Stack',
      total: 7,
      completed: 0,
      problems: [
        { id: 21, name: 'Valid Parentheses', difficulty: 'Easy', completed: false },
        { id: 22, name: 'Min Stack', difficulty: 'Medium', completed: false },
        { id: 23, name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', completed: false },
        { id: 24, name: 'Generate Parentheses', difficulty: 'Medium', completed: false },
        { id: 25, name: 'Daily Temperatures', difficulty: 'Medium', completed: false },
        { id: 26, name: 'Car Fleet', difficulty: 'Medium', completed: false },
        { id: 27, name: 'Largest Rectangle in Histogram', difficulty: 'Hard', completed: false },
      ]
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      total: 7,
      completed: 0,
      problems: [
        { id: 28, name: 'Binary Search', difficulty: 'Easy', completed: false },
        { id: 29, name: 'Search a 2D Matrix', difficulty: 'Medium', completed: false },
        { id: 30, name: 'Koko Eating Bananas', difficulty: 'Medium', completed: false },
        { id: 31, name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', completed: false },
        { id: 32, name: 'Search in Rotated Sorted Array', difficulty: 'Medium', completed: false },
        { id: 33, name: 'Time Based Key-Value Store', difficulty: 'Medium', completed: false },
        { id: 34, name: 'Median of Two Sorted Arrays', difficulty: 'Hard', completed: false },
      ]
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      total: 11,
      completed: 0,
      problems: [
        { id: 35, name: 'Reverse Linked List', difficulty: 'Easy', completed: false },
        { id: 36, name: 'Merge Two Sorted Lists', difficulty: 'Easy', completed: false },
        { id: 37, name: 'Reorder List', difficulty: 'Medium', completed: false },
        { id: 38, name: 'Remove Nth Node From End of List', difficulty: 'Medium', completed: false },
        { id: 39, name: 'Copy List with Random Pointer', difficulty: 'Medium', completed: false },
        { id: 40, name: 'Add Two Numbers', difficulty: 'Medium', completed: false },
        { id: 41, name: 'Linked List Cycle', difficulty: 'Easy', completed: false },
        { id: 42, name: 'Find the Duplicate Number', difficulty: 'Medium', completed: false },
        { id: 43, name: 'LRU Cache', difficulty: 'Medium', completed: false },
        { id: 44, name: 'Merge k Sorted Lists', difficulty: 'Hard', completed: false },
        { id: 45, name: 'Reverse Nodes in k-Group', difficulty: 'Hard', completed: false },
      ]
    },
    {
      id: 'trees',
      name: 'Trees',
      total: 15,
      completed: 0,
      problems: [
        { id: 46, name: 'Invert Binary Tree', difficulty: 'Easy', completed: false },
        { id: 47, name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', completed: false },
        { id: 48, name: 'Diameter of Binary Tree', difficulty: 'Easy', completed: false },
        { id: 49, name: 'Balanced Binary Tree', difficulty: 'Easy', completed: false },
        { id: 50, name: 'Same Tree', difficulty: 'Easy', completed: false },
        { id: 51, name: 'Subtree of Another Tree', difficulty: 'Easy', completed: false },
        { id: 52, name: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Medium', completed: false },
        { id: 53, name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', completed: false },
        { id: 54, name: 'Binary Tree Right Side View', difficulty: 'Medium', completed: false },
        { id: 55, name: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', completed: false },
        { id: 56, name: 'Validate Binary Search Tree', difficulty: 'Medium', completed: false },
        { id: 57, name: 'Kth Smallest Element in a BST', difficulty: 'Medium', completed: false },
        { id: 58, name: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', completed: false },
        { id: 59, name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', completed: false },
        { id: 60, name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', completed: false },
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
      case 'Easy': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const getProblemSlug = (name: string) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Practice Problems</h1>
          <p className="text-gray-600">
            Solve curated problems and track your improvement across different data structure and algorithm topics.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Problem Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {expandedCategories[category.id] ? (
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                  <span className="text-sm text-gray-500">
                    ({category.completed} / {category.total})
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(category.completed, category.total)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Problems List */}
              {expandedCategories[category.id] && (
                <div className="border-t border-gray-200">
                  {category.problems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                          {problem.completed && (
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                          )}
                        </div>
                          <Link href={`/problems/${getProblemSlug(problem.name)}`}>
                            <span className="text-gray-900 font-medium hover:underline">
                              {problem.name}
                            </span>
                          </Link>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {problemCategories.reduce((sum, cat) => sum + cat.completed, 0)}
            </div>
            <div className="text-sm text-gray-600">Problems Solved</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {problemCategories.reduce((sum, cat) => sum + cat.total, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Problems</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(
                (problemCategories.reduce((sum, cat) => sum + cat.completed, 0) /
                 problemCategories.reduce((sum, cat) => sum + cat.total, 0)) * 100
              )}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticePage;