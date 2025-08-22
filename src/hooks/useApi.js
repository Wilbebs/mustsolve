// File: src/hooks/useApi.js
// React hooks for data fetching with loading states and error handling

'use client';

import { useState, useEffect } from 'react';
import apiService from '@/services/apiService';

// Generic API hook
export function useApiCall(apiFunction, dependencies = [], options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { immediate = true } = options;

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      console.error('API Hook Error:', err);
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && apiFunction) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, execute, refetch: execute };
}

// Health check hook
export function useHealthCheck() {
  return useApiCall(() => apiService.checkHealth(), [], { immediate: true });
}

// Problems hooks
export function useProblems(filters = {}) {
  const { data, loading, error, execute } = useApiCall(
    () => apiService.getAllProblems(filters),
    [JSON.stringify(filters)]
  );

  return {
    problems: data?.data || [],
    total: data?.total || 0,
    loading,
    error,
    refetch: execute
  };
}

export function useProblem(slug) {
  const { data, loading, error, execute } = useApiCall(
    () => apiService.getProblemBySlug(slug),
    [slug],
    { immediate: !!slug }
  );

  return {
    problem: data?.data ? apiService.transformProblem(data.data) : null,
    loading,
    error,
    refetch: execute
  };
}

// Categories hook
export function useCategories() {
  const { data, loading, error, execute } = useApiCall(
    () => apiService.getAllCategories(),
    []
  );

  return {
    categories: data?.data?.map(cat => apiService.transformCategory(cat)) || [],
    loading,
    error,
    refetch: execute
  };
}

// Dashboard stats hook
export function useDashboardStats() {
  const { data, loading, error, execute } = useApiCall(
    () => apiService.getDashboardStats(),
    []
  );

  return {
    stats: data?.data || {
      totalProblems: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
      totalCategories: 0
    },
    loading,
    error,
    refetch: execute
  };
}

// Code execution hook
export function useCodeExecution() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeCode = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.executeCode(payload);
      return result;
    } catch (err) {
      console.error('Code Execution Error:', err);
      setError(err.message || 'Code execution failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { executeCode, loading, error };
}

// Solution submission hook
export function useSolutionSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitSolution = async (slug, payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.submitSolution(slug, payload);
      return result;
    } catch (err) {
      console.error('Solution Submission Error:', err);
      setError(err.message || 'Solution submission failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitSolution, loading, error };
}

// Combined hook for practice page
export function usePracticeData(filters = {}) {
  const { problems, loading: problemsLoading, error: problemsError, refetch: refetchProblems } = useProblems(filters);
  const { categories, loading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats();

  // Combine problems with categories
  const categoriesWithProblems = categories.map(category => {
    const categoryProblems = problems.filter(problem => problem.category === category.name);
    return {
      ...category,
      problems: categoryProblems,
      total: categoryProblems.length,
      completed: categoryProblems.filter(p => p.completed).length
    };
  });

  return {
    categories: categoriesWithProblems,
    problems,
    stats,
    loading: problemsLoading || categoriesLoading || statsLoading,
    error: problemsError || categoriesError || statsError,
    refetch: () => {
      refetchProblems();
      refetchCategories();
      refetchStats();
    }
  };
}

// Error boundary hook for API errors
export function useApiErrorHandler() {
  const [errors, setErrors] = useState([]);

  const addError = (error) => {
    const errorId = Date.now();
    const errorObject = {
      id: errorId,
      message: error.message || error,
      timestamp: new Date().toISOString()
    };
    
    setErrors(prev => [...prev, errorObject]);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      setErrors(prev => prev.filter(err => err.id !== errorId));
    }, 5000);
  };

  const removeError = (errorId) => {
    setErrors(prev => prev.filter(err => err.id !== errorId));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return { errors, addError, removeError, clearErrors };
}