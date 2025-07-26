'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function ModuleOnePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || isDragging) return;
    setProgress((audio.currentTime / audio.duration) * 100);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    
    <div className="min-h-screen bg-white flex items-start justify-center px-4 pt-20">
      <div className="bg-gray-100 rounded-lg shadow-lg p-10 max-w-3xl w-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Module 1: Two Sum</h1>
        <p className="mb-8 text-center text-gray-700">
          This audio module introduces the famous <strong>Two Sum</strong> problem — a classic and highly rated LeetCode challenge often asked in coding interviews. Learn the logic, the strategy, and how to build efficient solutions.
        </p>

         {/* ADD THIS SECTION - Google Doc iframe */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">📚 Study Guide & Resources</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <iframe 
              src="https://docs.google.com/document/d/e/2PACX-1vTwjZOtOYYirYk6NBxC1-4vaXdphGXxHHxs-cJaKCLSsosvDGdLGja4-e4l2qvpIA/pub?embedded=true"
              width="100%" 
              height="500px" 
              frameBorder="0"
              className="border-0"
              title="Two Sum Complete Guide"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <audio ref={audioRef} src="/module1.mp3" preload="metadata" />

          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-green-400 text-black rounded-full text-xl flex items-center justify-center hover:bg-green-300 transition-colors"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div
              ref={progressBarRef}
              className="relative w-64 h-2 bg-gray-300 rounded cursor-pointer"
              onMouseDown={(e) => {
                setIsDragging(true);
                seekAudio(e);
              }}
            >
              <div
                className="absolute top-0 left-0 h-full bg-green-400 transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
