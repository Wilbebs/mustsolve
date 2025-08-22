// File: src/services/apiService.js
// Frontend API service for communicating with the MustSolve backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic API request handler
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      console.log(`🌐 API Request: ${requestOptions.method || 'GET'} ${url}`);
      
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ API Response: ${url}`, data);
      return data;
    } catch (error) {
      console.error(`❌ API Error: ${url}`, error);
      throw error;
    }
  }

  // Health check
  async checkHealth() {
    return this.makeRequest('/health');
  }

  // Problems endpoints
  async getAllProblems(params = {}) {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.append('category', params.category);
    if (params.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params.search) searchParams.append('search', params.search);
    
    const endpoint = `/problems${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getProblemBySlug(slug) {
    if (!slug) {
      throw new Error('Problem slug is required');
    }
    return this.makeRequest(`/problems/${slug}`);
  }

  // Categories endpoints
  async getAllCategories() {
    return this.makeRequest('/categories');
  }

  // Stats endpoint
  async getDashboardStats() {
    return this.makeRequest('/stats');
  }

  // Code execution endpoint
  async executeCode(payload) {
    const { code, testCases, problemType, language = 'Java' } = payload;
    
    if (!code || !testCases || !problemType) {
      throw new Error('Missing required fields for code execution');
    }

    return this.makeRequest('/execute-java', {
      method: 'POST',
      body: JSON.stringify({
        code,
        testCases,
        problemType
      })
    });
  }

  // Submit solution (placeholder for future implementation)
  async submitSolution(slug, payload) {
    const { language, code } = payload;
    
    return this.makeRequest(`/problems/${slug}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        language,
        code
      })
    });
  }

  // Transform database problem to frontend format
  transformProblem(dbProblem) {
    return {
      id: dbProblem.id,
      slug: dbProblem.slug,
      title: dbProblem.title,
      difficulty: dbProblem.difficulty,
      category: dbProblem.category,
      completed: false, // This would come from user progress in the future
      description: dbProblem.description,
      constraints: dbProblem.constraints,
      hints: dbProblem.hints || [],
      exampleInput: dbProblem.exampleInput,
      exampleOutput: dbProblem.exampleOutput,
      starterCode: dbProblem.starterCode || {},
      testCases: dbProblem.testCases || [],
      isActive: dbProblem.isActive,
      createdAt: dbProblem.createdAt,
      updatedAt: dbProblem.updatedAt
    };
  }

  // Transform database category to frontend format
  transformCategory(dbCategory) {
    return {
      id: dbCategory.id,
      name: dbCategory.name,
      description: dbCategory.description,
      color: this.getCategoryColor(dbCategory.name),
      total: dbCategory.problemCount,
      completed: 0, // This would come from user progress in the future
      problems: [] // Populated separately when needed
    };
  }

  // Get category color mapping (same as hardcoded frontend)
  getCategoryColor(categoryName) {
    const colorMap = {
      'Arrays & Hashing': 'from-green-400 to-emerald-500',
      'Two Pointers': 'from-blue-400 to-cyan-500',
      'Sliding Window': 'from-purple-400 to-pink-500',
      'Stack': 'from-orange-400 to-red-500',
      'Binary Search': 'from-indigo-400 to-purple-500',
      'Linked List': 'from-teal-400 to-cyan-500',
      'Trees': 'from-yellow-400 to-orange-500'
    };
    
    return colorMap[categoryName] || 'from-gray-400 to-gray-500';
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;