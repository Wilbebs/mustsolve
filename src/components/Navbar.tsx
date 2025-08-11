// File: src/components/Navbar.tsx

'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-green-400/20">
      <div className="max-w-8xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              MustSolve
            </h1>
            <Image
              src="/logo/crt-logo.svg"
              alt="MustSolve Logo"
              width={32}
              height={32}
              className="rounded-lg border border-green-400/30 group-hover:border-green-400 transition-colors duration-200"
            />
          </Link>

          {/* Navigation Links - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-green-500/20 active:bg-green-500/30 active:scale-95 transition-all duration-200 font-medium border border-transparent hover:border-green-400/30"
            >
              Home
            </Link>
            <Link
              href="/practice"
              className="px-5 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-green-500/20 active:bg-green-500/30 active:scale-95 transition-all duration-200 font-medium border border-transparent hover:border-green-400/30"
            >
              Practice
            </Link>
            <Link
              href="/friends"
              className="px-5 py-2.5 rounded-full text-gray-300 hover:text-white hover:bg-green-500/20 active:bg-green-500/30 active:scale-95 transition-all duration-200 font-medium border border-transparent hover:border-green-400/30"
            >
              Friends
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center">
            {loading ? (
              <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              /* User Menu */
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-full hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-black font-bold">
                    {user.user_metadata?.first_name?.charAt(0) || user.email?.charAt(0) || '?'}
                  </div>
                  <span className="text-white font-medium">
                    {user.user_metadata?.first_name || 'User'}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-2">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-white font-medium">
                        {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                      </p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    
                    <Link 
                      href="/profile" 
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>👤</span>
                      Profile
                    </Link>
                    
                    <Link 
                      href="/settings" 
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <span>⚙️</span>
                      Settings
                    </Link>
                    
                    <hr className="my-2 border-gray-700" />
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors w-full text-left"
                    >
                      <span>🚪</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <Link
                href="/login"
                className="px-6 py-2.5 bg-transparent border-2 border-green-400 text-green-400 rounded-full hover:bg-green-400 hover:text-black hover:shadow-lg hover:shadow-green-400/25 active:scale-95 transition-all duration-200 font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}