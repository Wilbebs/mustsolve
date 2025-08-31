// mustsolve-backend/server.js - Enhanced with Database Integration
require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const crypto = require('crypto');
const cors = require('cors');
const os = require('os');
const { pool } = require('./src/services/database');

// Import database service
const db = require('./src/services/database');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://mustsolve.com', 'https://www.mustsolve.com'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Security settings for Java execution
const EXECUTION_TIMEOUT = 5000;
const TEMP_DIR = path.join(os.tmpdir(), 'java_execution');
const MAX_OUTPUT_SIZE = 10000;

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create temp directory:', error);
  }
}

// Clean up old files
async function cleanupOldFiles() {
  try {
    const files = await fs.readdir(TEMP_DIR);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(TEMP_DIR, file);
      const stats = await fs.stat(filePath);
      
      if (now - stats.mtime.getTime() > 3600000) {
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const isDbConnected = await db.testConnection();
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: isDbConnected ? 'Connected' : 'Disconnected',
      version: '1.0.0',
      javaVersion: process.env.JAVA_VERSION || 'detected automatically'
    });
  } catch (error) {
    res.status(503).json({
      status: 'Error',
      timestamp: new Date().toISOString(),
      database: 'Error',
      error: error.message
    });
  }
});

// =============================================================================
// DATABASE API ENDPOINTS
// =============================================================================

// GET /api/problems - Get all problems (list view)
app.get('/api/problems', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    
    let problems;
    
    if (search) {
      problems = await db.searchProblems(search);
    } else if (category) {
      problems = await db.getProblemsByCategory(category);
    } else if (difficulty) {
      problems = await db.getProblemsByDifficulty(difficulty);
    } else {
      problems = await db.getAllProblems();
    }
    
    res.status(200).json({
      success: true,
      data: problems,
      total: problems.length
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problems',
      error: error.message
    });
  }
});

// GET /api/problems/:slug - Get specific problem by slug
app.get('/api/problems/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const problem = await db.getProblemBySlug(slug);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: problem
    });
  } catch (error) {
    console.error('Error fetching problem:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problem',
      error: error.message
    });
  }
});

// GET /api/categories - Get all categories with problem counts
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.getAllCategories();
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// GET /api/stats - Get dashboard statistics
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await db.getDashboardStats();
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

// Add this to your server.js temporarily
app.get('/api/migrate', async (req, res) => {
  try {
    // Test if we can connect first
    const isConnected = await db.testConnection();
    if (!isConnected) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    // Since you already have database functions, let's create a simple migration
    // We'll need to access the pool through the database service
    // For now, let's just verify the connection works
    res.json({ 
      success: true, 
      message: 'Database connected successfully. Ready for manual migration.',
      connected: isConnected 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================================================================
// JAVA CODE EXECUTION (existing functionality)
// =============================================================================

// Execute Java code safely
async function executeJavaCode(code, testCases, problemType) {
  const sessionId = crypto.randomUUID();
  const javaFile = path.join(TEMP_DIR, `${sessionId}.java`);
  const classFile = path.join(TEMP_DIR, `${sessionId}.class`);
  
  try {
    await fs.writeFile(javaFile, code);
    
    const compileCmd = `javac -cp "${TEMP_DIR}" "${javaFile}"`;
    
    try {
      const { stderr: compileError } = await execAsync(compileCmd, {
        timeout: EXECUTION_TIMEOUT,
        cwd: TEMP_DIR
      });
      
      if (compileError) {
        return {
          success: false,
          error: `Compilation Error\n\n${compileError}`,
          output: ''
        };
      }
    } catch (compileErr) {
      return {
        success: false,
        error: `Compilation Error\n\n${compileErr.message}`,
        output: ''
      };
    }
    
    const results = [];
    
    for (const testCase of testCases) {
      try {
        const result = await executeTestCase(sessionId, testCase, problemType);
        results.push(result);
      } catch (execError) {
        results.push({
          success: false,
          error: `Runtime Error\n\n${execError.message}`,
          testCase
        });
      }
    }
    
    return { results };
    
  } finally {
    try {
      await fs.unlink(javaFile).catch(() => {});
      await fs.unlink(classFile).catch(() => {});
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
  }
}

// Execute individual test case
async function executeTestCase(sessionId, testCase, problemType) {
  let javaRunner;
  
  if (problemType === 'two-sum') {
    javaRunner = `
class TestRunner {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {${testCase.nums.join(',')}};
        int target = ${testCase.target};
        
        try {
            int[] result = solution.twoSum(nums, target);
            System.out.print("[");
            for (int i = 0; i < result.length; i++) {
                System.out.print(result[i]);
                if (i < result.length - 1) System.out.print(",");
            }
            System.out.println("]");
        } catch (Exception e) {
            System.err.println("Runtime Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`;
  } else if (problemType === 'valid-anagram') {
    javaRunner = `
class TestRunner {
    public static void main(String[] args) {
        Solution solution = new Solution();
        String s = "${testCase.s}";
        String t = "${testCase.t}";
        
        try {
            boolean result = solution.isAnagram(s, t);
            System.out.println(result);
        } catch (Exception e) {
            System.err.println("Runtime Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`;
  } else if (problemType === 'contains-duplicate') {
    javaRunner = `
class TestRunner {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {${testCase.nums.join(',')}};
        
        try {
            boolean result = solution.containsDuplicate(nums);
            System.out.println(result);
        } catch (Exception e) {
            System.err.println("Runtime Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`;
  }
  
  const runnerFile = path.join(TEMP_DIR, `TestRunner.java`);
  const runnerClass = path.join(TEMP_DIR, `TestRunner.class`);
  
  try {
    await fs.writeFile(runnerFile, javaRunner);
    
    const compileCmd = `javac -cp "${TEMP_DIR}" "${runnerFile}"`;
    await execAsync(compileCmd, { timeout: EXECUTION_TIMEOUT });
    
    const executeCmd = `java -cp "${TEMP_DIR}" TestRunner`;
    const { stdout, stderr } = await execAsync(executeCmd, {
      timeout: EXECUTION_TIMEOUT,
      maxBuffer: MAX_OUTPUT_SIZE
    });
    
    if (stderr) {
      return {
        success: false,
        error: `Runtime Error\n\n${stderr}`,
        testCase,
        actualOutput: stdout.trim()
      };
    }
    
    const actualOutput = stdout.trim();
    let success = false;
    
    if (problemType === 'two-sum') {
      const expected = JSON.stringify(testCase.expected);
      const actual = actualOutput.replace(/\s/g, '');
      success = actual === expected.replace(/\s/g, '');
    } else if (problemType === 'valid-anagram') {
      const expected = testCase.expected.toString();
      success = actualOutput === expected;
    } else if (problemType === 'contains-duplicate') {
      const expected = testCase.expected.toString();
      success = actualOutput === expected;
    }
    
    return {
      success,
      testCase,
      actualOutput,
      expectedOutput: problemType === 'two-sum' ? 
        JSON.stringify(testCase.expected) : 
        testCase.expected.toString()
    };
    
  } finally {
    try {
      await fs.unlink(runnerFile).catch(() => {});
      await fs.unlink(runnerClass).catch(() => {});
    } catch (error) {
      console.error('Runner cleanup error:', error);
    }
  }
}

// POST /api/execute-java - Execute Java code (existing endpoint)
app.post('/api/execute-java', async (req, res) => {
  try {
    const { code, testCases, problemType } = req.body;
    
    if (!code || !testCases || !problemType) {
      return res.status(400).json({
        error: 'Missing required fields: code, testCases, problemType'
      });
    }
    
    if (code.length > 50000) {
      return res.status(400).json({
        error: 'Code too long (max 50KB)'
      });
    }
    
    if (testCases.length > 10) {
      return res.status(400).json({
        error: 'Too many test cases (max 10)'
      });
    }
    
    console.log(`Executing ${problemType} with ${testCases.length} test cases`);
    
    const result = await executeJavaCode(code, testCases, problemType);
    res.json(result);
    
  } catch (error) {
    console.error('Execution error:', error);
    res.status(500).json({
      error: 'Internal server error during code execution'
    });
  }
});

// POST /api/problems/:slug/submit - Submit solution (placeholder for future)
app.post('/api/problems/:slug/submit', async (req, res) => {
  try {
    const { slug } = req.params;
    const { language, code } = req.body;
    
    // Placeholder for code execution and testing logic
    
    res.status(200).json({
      success: true,
      message: 'Solution submitted successfully',
      data: {
        slug,
        language,
        status: 'pending',
        executionTime: null,
        memoryUsed: null,
        testsPassed: null,
        totalTests: null
      }
    });
  } catch (error) {
    console.error('Error submitting solution:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit solution',
      error: error.message
    });
  }
});

// Export data endpoint
app.get('/api/export', async (req, res) => {
  try {
    const problems = await db.getAllProblems();
    const categories = await db.getAllCategories();
    
    res.json({
      problems,
      categories,
      message: 'Copy this JSON data to migrate to Supabase'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Catch-all route for undefined API endpoints
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    console.log('🔌 Testing database connection...');
    const isConnected = await db.testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Check your environment variables.');
      process.exit(1);
    }
    
    // Ensure temp directory for Java execution
    await ensureTempDir();
    
    // Cleanup old files every hour
    setInterval(cleanupOldFiles, 3600000);
    
    app.listen(PORT, () => {
      console.log(`🚀 MustSolve Backend running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📁 Java temp directory: ${TEMP_DIR}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await db.closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await db.closePool();
  process.exit(0);
});

startServer();