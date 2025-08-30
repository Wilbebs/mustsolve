// File: src/app/friends/page.tsx

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('progress');

  // Mock data for user and friends
  const userData = {
    name: "You",
    username: "current_user",
    totalSolved: 45,
    avatar: "🧑‍💻",
    level: "Intermediate",
    streak: 12
  };

  const friendsData = [
    {
      name: "Sarah Chen",
      username: "sarah_codes",
      totalSolved: 67,
      avatar: "👩‍💻",
      level: "Advanced",
      streak: 8,
      isOnline: true
    },
    {
      name: "Mike Johnson",
      username: "mike_j",
      totalSolved: 34,
      avatar: "👨‍💻",
      level: "Beginner",
      streak: 5,
      isOnline: false
    },
    {
      name: "Alex Kim",
      username: "alex_dev",
      totalSolved: 89,
      avatar: "🧑‍💻",
      level: "Expert",
      streak: 25,
      isOnline: true
    },
    {
      name: "Emma Rodriguez",
      username: "emma_r",
      totalSolved: 52,
      avatar: "👩‍💻",
      level: "Intermediate",
      streak: 3,
      isOnline: true
    }
  ];

  const topicProgress = [
    {
      topic: "Arrays & Hashing",
      yourProgress: { solved: 8, total: 9, percentage: 89 },
      friends: [
        { name: "Sarah", solved: 9, total: 9, percentage: 100 },
        { name: "Alex", solved: 9, total: 9, percentage: 100 },
        { name: "Emma", solved: 7, total: 9, percentage: 78 },
        { name: "Mike", solved: 6, total: 9, percentage: 67 }
      ]
    },
    {
      topic: "Two Pointers", 
      yourProgress: { solved: 3, total: 5, percentage: 60 },
      friends: [
        { name: "Alex", solved: 5, total: 5, percentage: 100 },
        { name: "Sarah", solved: 4, total: 5, percentage: 80 },
        { name: "Emma", solved: 3, total: 5, percentage: 60 },
        { name: "Mike", solved: 2, total: 5, percentage: 40 }
      ]
    },
    {
      topic: "Sliding Window",
      yourProgress: { solved: 2, total: 6, percentage: 33 },
      friends: [
        { name: "Alex", solved: 6, total: 6, percentage: 100 },
        { name: "Sarah", solved: 5, total: 6, percentage: 83 },
        { name: "Emma", solved: 4, total: 6, percentage: 67 },
        { name: "Mike", solved: 1, total: 6, percentage: 17 }
      ]
    },
    {
      topic: "Stack",
      yourProgress: { solved: 4, total: 7, percentage: 57 },
      friends: [
        { name: "Alex", solved: 7, total: 7, percentage: 100 },
        { name: "Sarah", solved: 6, total: 7, percentage: 86 },
        { name: "Mike", solved: 3, total: 7, percentage: 43 },
        { name: "Emma", solved: 3, total: 7, percentage: 43 }
      ]
    },
    {
      topic: "Binary Search",
      yourProgress: { solved: 3, total: 7, percentage: 43 },
      friends: [
        { name: "Alex", solved: 7, total: 7, percentage: 100 },
        { name: "Sarah", solved: 5, total: 7, percentage: 71 },
        { name: "Emma", solved: 4, total: 7, percentage: 57 },
        { name: "Mike", solved: 2, total: 7, percentage: 29 }
      ]
    },
    {
      topic: "Linked List",
      yourProgress: { solved: 6, total: 11, percentage: 55 },
      friends: [
        { name: "Alex", solved: 11, total: 11, percentage: 100 },
        { name: "Sarah", solved: 9, total: 11, percentage: 82 },
        { name: "Emma", solved: 7, total: 11, percentage: 64 },
        { name: "Mike", solved: 4, total: 11, percentage: 36 }
      ]
    },
    {
      topic: "Trees",
      yourProgress: { solved: 5, total: 15, percentage: 33 },
      friends: [
        { name: "Alex", solved: 15, total: 15, percentage: 100 },
        { name: "Sarah", solved: 12, total: 15, percentage: 80 },
        { name: "Emma", solved: 8, total: 15, percentage: 53 },
        { name: "Mike", solved: 3, total: 15, percentage: 20 }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

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
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Friends & Progress
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your progress and compete with friends across different data structure topics
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex justify-center">
            <div className="flex gap-4 p-2 bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-600">
              {['progress', 'friends'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {tab === 'progress' ? '📊 Topic Progress' : '👥 Friends List'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {activeTab === 'progress' && (
          <motion.div 
            className="max-w-6xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {topicProgress.map((topic, index) => (
              <div key={index} className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{topic.topic}</h3>
                  <div className="text-sm text-gray-400">
                    {topic.yourProgress.solved}/{topic.yourProgress.total} solved
                  </div>
                </div>

                {/* Your Progress */}
                <div className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{userData.avatar}</span>
                      <span className="text-white font-semibold">Your Progress</span>
                    </div>
                    <span className="text-green-400 font-bold">{topic.yourProgress.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${getProgressColor(topic.yourProgress.percentage)} transition-all duration-500`}
                      style={{ width: `${topic.yourProgress.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Friends Progress */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-300 mb-3">Friends Progress</h4>
                  {topic.friends.map((friend, friendIndex) => (
                    <div key={friendIndex} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👤</span>
                        <span className="text-white">{friend.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(friend.percentage)} transition-all duration-500`}
                            style={{ width: `${friend.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-300 text-sm w-12 text-right">{friend.percentage}%</span>
                        <span className="text-gray-400 text-sm w-16 text-right">
                          {friend.solved}/{topic.yourProgress.total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'friends' && (
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Your Profile Card */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{userData.avatar}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{userData.name}</h3>
                    <p className="text-gray-300">@{userData.username}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`font-semibold ${getLevelColor(userData.level)}`}>
                        {userData.level}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-orange-400">🔥 {userData.streak} day streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                    {userData.totalSolved}
                  </div>
                  <div className="text-gray-300">Problems Solved</div>
                </div>
              </div>
            </div>

            {/* Friends List */}
            <div className="grid md:grid-cols-2 gap-6">
              {friendsData.map((friend, index) => (
                <motion.div
                  key={index}
                  className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="text-4xl">{friend.avatar}</div>
                        {friend.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{friend.name}</h4>
                        <p className="text-gray-400">@{friend.username}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{friend.totalSolved}</div>
                      <div className="text-gray-400 text-sm">solved</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`font-semibold ${getLevelColor(friend.level)}`}>
                        {friend.level}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-orange-400">🔥 {friend.streak} days</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                        Challenge
                      </button>
                      <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                        Message
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Friends Section */}
            <motion.div 
              className="mt-8 bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-4xl mb-4">👋</div>
              <h3 className="text-xl font-bold text-white mb-2">Invite Friends</h3>
              <p className="text-gray-300 mb-4">Challenge your friends and track progress together!</p>
              <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold rounded-xl hover:from-green-500 hover:to-blue-600 transition-all duration-300">
                Add Friends
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}