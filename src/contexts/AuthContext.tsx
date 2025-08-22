// File: src/contexts/AuthContext.tsx - Minimal version without Supabase

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, username: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(false); // Set to false since we're not loading anything

  useEffect(() => {
    // For now, just set loading to false
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, username: string) => {
    // Placeholder - return success for now
    console.log('Sign up placeholder:', { email, firstName, lastName, username });
    return { data: null, error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Placeholder - return success for now
    console.log('Sign in placeholder:', { email });
    return { data: null, error: null };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    console.log('Sign out placeholder');
  };

  const resetPassword = async (email: string) => {
    // Placeholder - return success for now
    console.log('Reset password placeholder:', { email });
    return { data: null, error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}