// File: src/app/modules/page.tsx

'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModulesPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeModule, setActiveModule] = useState(1);
  const [audioLoaded, setAudioLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const modules = [
    {
      id: 1,
      title: "Two Sum",
      subtitle: "Arrays & Hash Maps",
      description: "Master the most fundamental interview problem and learn optimal data structure selection",
      difficulty: "Essential",
      duration: "120 min",
      status: "available",
      color: "from-green-400 to-emerald-500",
      topics: ["Hash Map Implementation", "Time Complexity O(n)", "Space Optimization", "Edge Cases"],
      hasAudio: true,
      audioFile: "/module1.mp3"
    },
    {
      id: 2,
      title: "Add Two Numbers",
      subtitle: "Linked Lists",
      description: "Learn pointer manipulation and linked list traversal techniques",
      difficulty: "Essential",
      duration: "120 min", 
      status: "coming-soon",
      color: "from-blue-400 to-cyan-500",
      topics: ["Pointer Arithmetic", "Linked List Traversal", "Carry Logic", "Memory Management"],
      hasAudio: false,
      audioFile: null
    },
    {
      id: 3,
      title: "Valid Parentheses",
      subtitle: "Stack Operations",
      description: "Understand stack data structure and its practical applications",
      difficulty: "Essential",
      duration: "120 min",
      status: "coming-soon", 
      color: "from-purple-400 to-pink-500",
      topics: ["Stack Implementation", "LIFO Principle", "Matching Patterns", "String Processing"],
      hasAudio: false,
      audioFile: null
    },
    {
      id: 4,
      title: "Merge Two Sorted Lists",
      subtitle: "Advanced Linked Lists",
      description: "Compare iterative vs recursive approaches for list manipulation",
      difficulty: "Essential",
      duration: "120 min",
      status: "coming-soon",
      color: "from-orange-400 to-red-500", 
      topics: ["Merge Algorithms", "Recursion vs Iteration", "Sorted Data", "List Reconstruction"],
      hasAudio: false,
      audioFile: null
    },
    {
      id: 5,
      title: "Binary Tree Level Order Traversal",
      subtitle: "Trees & BFS/DFS",
      description: "Master tree traversal algorithms and breadth-first search",
      difficulty: "Essential",
      duration: "120 min",
      status: "coming-soon",
      color: "from-indigo-400 to-purple-500",
      topics: ["BFS Implementation", "Queue Data Structure", "Level-by-Level Processing", "Tree Visualization"],
      hasAudio: false,
      audioFile: null
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

  const floatingAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  // Audio control functions
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || isDragging) return;
    
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    setProgress(progressPercent);
    setCurrentTime(audio.currentTime);
    
    if (audio.duration && !duration) {
      setDuration(audio.duration);
    }
  };

  const seekAudio = (e: React.MouseEvent | MouseEvent) => {
    const audio = audioRef.current;
    const bar = progressBarRef.current;
    if (!audio || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;

    audio.currentTime = newTime;
    setProgress((clickX / width) * 100);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    seekAudio(e);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      seekAudio(e);
    }
  };

  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setAudioLoaded(true);
      setAudioError(false);
      if (audio.duration) {
        setDuration(audio.duration);
      }
    };
    
    const handleError = (e: Event) => {
      console.error('Audio loading error:', e);
      setAudioError(true);
      setAudioLoaded(false);
    };
    
    const handleCanPlay = () => {
      setAudioLoaded(true);
      setAudioError(false);
    };
    
    const handleTimeUpdate = () => updateProgress();
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Force load the audio
    audio.load();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

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
                  Learning Modules
                </h1>
                <div className="text-2xl text-green-300 font-mono">
                  5 Essential LeetCode Problems
                </div>
                <div className="text-lg text-gray-400 mt-2">
                  Master the fundamentals with structured, progressive learning
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Each module builds upon the previous one, ensuring you develop a solid foundation 
            for technical interview success
          </motion.p>
        </motion.div>

        {/* Module Selection Tabs */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {modules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                disabled={module.status === 'coming-soon'}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeModule === module.id
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg shadow-green-400/25'
                    : module.status === 'coming-soon'
                    ? 'bg-gray-700/50 text-gray-500 border border-gray-600 cursor-not-allowed'
                    : 'bg-black/40 text-gray-300 border border-gray-600 hover:border-green-400 hover:text-green-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  Module {module.id}
                  {module.status === 'coming-soon' && <span className="text-xs">🔒</span>}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Module Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            {modules
              .filter((module) => module.id === activeModule)
              .map((module) => (
                <div key={module.id} className="space-y-8">
                  {/* Module Header */}
                  <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-10 border border-purple-500/30 shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center text-black font-bold text-2xl`}>
                            {module.id}
                          </div>
                          <div>
                            <h2 className="text-4xl font-bold text-white mb-2">{module.title}</h2>
                            <p className="text-green-400 text-xl font-semibold">{module.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                          {module.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mb-6">
                          <div className={`inline-block px-4 py-2 bg-gradient-to-r ${module.color} bg-opacity-20 text-white rounded-full`}>
                            {module.difficulty}
                          </div>
                          <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full">
                            {module.duration}
                          </div>
                          <div className={`inline-block px-4 py-2 rounded-full ${
                            module.status === 'available' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {module.status === 'available' ? '✓ Available' : '🔒 Coming Soon'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-2xl blur-2xl opacity-30 animate-pulse`}></div>
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-green-400/30">
                          <div className="text-center">
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-green-400 mb-2">Interview Essential</h3>
                            <p className="text-gray-300">Critical problem for technical interviews at top companies</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Module Content */}
                  {module.id === 1 && module.status === 'available' && (
                    <>
                      {/* Collaborative Google Doc */}
                      <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-green-500/30">
                        <h3 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                          <span className="text-4xl">✏️</span>
                          Collaborative Study Guide
                        </h3>
                        <div className="bg-blue-500/10 border border-blue-400/30 rounded-2xl p-4 mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">👥</span>
                              <h4 className="text-lg font-semibold text-blue-400">Live Collaboration</h4>
                            </div>
                            <a 
                              href="https://docs.google.com/document/d/1A5MkTnJIbmXcomfdHiugel7CW_3i98KN/edit?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium text-sm"
                            >
                              📖 Open Full Editor
                            </a>
                          </div>
                          <p className="text-gray-300 text-sm">
                            This document is <strong>editable by all students</strong>. Click inside to edit, or use "Open Full Editor" for the complete Google Docs experience with all features.
                          </p>
                        </div>
                        <div className="border border-gray-600 rounded-2xl overflow-hidden shadow-2xl">
                          <iframe 
                            src="https://docs.google.com/document/d/1A5MkTnJIbmXcomfdHiugel7CW_3i98KN/edit?usp=sharing&embedded=true"
                            width="100%" 
                            height="600px" 
                            frameBorder="0"
                            className="border-0"
                            title="Collaborative Two Sum Study Guide - Add Your Notes!"
                            allow="clipboard-write"
                          />
                        </div>
                        <div className="mt-4 p-4 bg-green-500/10 border border-green-400/30 rounded-xl">
                          <div className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                            <span>💡</span>
                            <span>Collaboration Tips:</span>
                          </div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Add your name when contributing notes</li>
                            <li>• Use different colors for different solution approaches</li>
                            <li>• Comment on others' solutions to start discussions</li>
                            <li>• Share edge cases and test scenarios you discover</li>
                          </ul>
                        </div>
                      </div>

                      {/* Downloadable Resources */}
                      <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/30">
                        <h3 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                          <span className="text-4xl">📄</span>
                          Downloadable Resources
                        </h3>
                        <div className="max-w-2xl mx-auto">
                          <a 
                            href="https://drive.google.com/uc?export=download&id=1rjYN_LBOd8aD-kfOqWd-N3YHs7XnefRT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 group"
                          >
                            <div className="text-red-600 text-4xl group-hover:scale-110 transition-transform">📄</div>
                            <div className="flex-1">
                              <div className="font-bold text-white text-xl mb-2">Two Sum Analysis.pdf</div>
                              <div className="text-gray-300">Complete solution implementations, complexity analysis, and practice problems</div>
                            </div>
                            <div className="text-green-400 text-2xl group-hover:translate-x-2 transition-transform">→</div>
                          </a>
                        </div>
                      </div>

                      {/* Audio Module */}
                      <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
                        <h3 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                          <span className="text-4xl">🎧</span>
                          Audio Lesson
                        </h3>
                        
                        <div className="max-w-4xl mx-auto">
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-green-400/30">
                            <div className="text-center mb-8">
                              <h4 className="text-2xl font-bold text-green-400 mb-2">Module 1: Two Sum Deep Dive</h4>
                              <p className="text-gray-300">Comprehensive audio walkthrough of the Two Sum problem and solution strategies</p>
                            </div>

                            {/* Audio Player */}
                            <div className="bg-black/60 rounded-2xl p-6 border border-gray-700">
                              <audio ref={audioRef} preload="metadata">
                                <source src="/module1.mp3" type="audio/mpeg" />
                                <source src="/module1.wav" type="audio/wav" />
                                <source src="/module1.ogg" type="audio/ogg" />
                                Your browser does not support the audio element.
                              </audio>
                              
                              {audioError && (
                                <div className="text-center py-8">
                                  <div className="text-red-400 text-6xl mb-4">⚠️</div>
                                  <h4 className="text-xl font-bold text-red-400 mb-2">Audio Loading Error</h4>
                                  <p className="text-gray-300 mb-4">
                                    Unable to load the audio file. Please check:
                                  </p>
                                  <ul className="text-gray-400 text-sm space-y-1 mb-6">
                                    <li>• Is module1.mp3 in the /public folder?</li>
                                    <li>• Is the file format correct (MP3/WAV/OGG)?</li>
                                    <li>• Try refreshing the page</li>
                                  </ul>
                                  <button
                                    onClick={() => {
                                      setAudioError(false);
                                      setAudioLoaded(false);
                                      audioRef.current?.load();
                                    }}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                  >
                                    🔄 Retry Loading
                                  </button>
                                </div>
                              )}
                              
                              {!audioLoaded && !audioError && (
                                <div className="text-center py-8">
                                  <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                  <p className="text-gray-300">Loading audio...</p>
                                  <p className="text-gray-500 text-sm mt-2">If this takes too long, the audio file might be missing</p>
                                </div>
                              )}

                              {audioLoaded && (
                                <div className="space-y-6">
                                  {/* Play Controls */}
                                  <div className="flex items-center justify-center gap-6">
                                    <button
                                      onClick={togglePlay}
                                      className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-full text-2xl flex items-center justify-center hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-green-400/25"
                                    >
                                      {isPlaying ? '⏸' : '▶'}
                                    </button>
                                  </div>

                                  {/* Progress Bar */}
                                  <div className="space-y-2">
                                    <div
                                      ref={progressBarRef}
                                      className="relative w-full h-3 bg-gray-700 rounded-full cursor-pointer group"
                                      onMouseDown={(e) => {
                                        setIsDragging(true);
                                        seekAudio(e);
                                      }}
                                    >
                                      <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-200"
                                        style={{ width: `${progress}%` }}
                                      ></div>
                                      <div
                                        className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-200 group-hover:scale-110"
                                        style={{ left: `calc(${progress}% - 10px)` }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-400">
                                      <span>{formatTime(currentTime)}</span>
                                      <span>Audio Lesson</span>
                                      <span>{formatTime(duration)}</span>
                                    </div>
                                  </div>

                                  {/* Audio Description */}
                                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="p-4 bg-gray-800/50 rounded-xl">
                                      <h5 className="text-lg font-semibold text-green-400 mb-3">What You'll Learn:</h5>
                                      <ul className="space-y-2 text-gray-300">
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                          Problem breakdown and analysis
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                          Brute force vs optimized approaches
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                          Hash map implementation details
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                          Time and space complexity analysis
                                        </li>
                                      </ul>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800/50 rounded-xl">
                                      <h5 className="text-lg font-semibold text-blue-400 mb-3">Key Concepts:</h5>
                                      <div className="grid grid-cols-2 gap-2">
                                        {module.topics.map((topic, index) => (
                                          <div key={index} className="p-2 bg-gray-700/50 rounded-lg text-center">
                                            <span className="text-gray-200 text-sm">{topic}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Coming Soon Modules */}
                  {module.status === 'coming-soon' && (
                    <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-600/30 text-center">
                      <div className="text-6xl mb-6">🔒</div>
                      <h3 className="text-3xl font-bold text-gray-400 mb-4">Coming Soon</h3>
                      <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                        This module is currently under development. Complete Module 1 to unlock the next chapter 
                        of your interview preparation journey.
                      </p>
                      
                      {/* Preview Topics */}
                      <div className="max-w-md mx-auto">
                        <h4 className="text-lg font-semibold text-gray-400 mb-4">Preview Topics:</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {module.topics.map((topic, index) => (
                            <div key={index} className="p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
                              <span className="text-gray-500 text-sm">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Module Overview Grid */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">Complete Learning Path</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                className="relative group cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setActiveModule(module.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${module.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                <div className={`relative bg-black/60 backdrop-blur-sm rounded-2xl p-6 border h-full ${
                  module.status === 'available' ? 'border-green-400/30' : 'border-gray-700'
                }`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center text-black font-bold text-lg`}>
                      {module.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{module.title}</h3>
                      <p className="text-green-400 text-sm">{module.subtitle}</p>
                    </div>
                    {module.status === 'available' ? (
                      <div className="text-green-400 text-2xl">✓</div>
                    ) : (
                      <div className="text-gray-500 text-xl">🔒</div>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{module.description}</p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{module.duration}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      module.status === 'available' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {module.status === 'available' ? 'Available' : 'Coming Soon'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-3xl p-12 border border-green-500/30">
            <h2 className="text-4xl font-bold text-white mb-8">Your Progress</h2>
            
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Course Completion</span>
                <span className="text-white font-semibold">1 / 5 Modules</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{ width: '20%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Started</span>
                <span>20% Complete</span>
                <span>5 Modules Total</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                <div className="text-3xl font-bold text-green-400 mb-2">1</div>
                <div className="text-gray-300">Modules Completed</div>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                <div className="text-gray-300">Modules Remaining</div>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">120m</div>
                <div className="text-gray-300">Time Invested</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <button
                  onClick={() => setActiveModule(1)}
                  className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-green-400/50 group-hover:border-green-400 transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    🎯 Continue Module 1
                  </span>
                </button>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <Link href="/course-overview">
                  <button className="relative bg-black/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-blue-400/50 group-hover:border-blue-400 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      📚 Course Overview
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}