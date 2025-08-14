// backend/server.js - Node.js + Express Backend for Java Execution

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const crypto = require('crypto');
const cors = require('cors');
const os = require('os');

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Security settings
const EXECUTION_TIMEOUT = 5000; // 5 seconds
const TEMP_DIR = path.join(os.tmpdir(), 'java_execution'); // Windows-compatible temp directory
const MAX_OUTPUT_SIZE = 10000; // 10KB max output

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create temp directory:', error);
  }
}

// Clean up old files (run periodically)
async function cleanupOldFiles() {
  try {
    const files = await fs.readdir(TEMP_DIR);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(TEMP_DIR, file);
      const stats = await fs.stat(filePath);
      
      // Delete files older than 1 hour
      if (now - stats.mtime.getTime() > 3600000) {
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}

// Execute Java code safely
async function executeJavaCode(code, testCases, problemType) {
  const sessionId = crypto.randomUUID();
  const className = 'Solution';
  const javaFile = path.join(TEMP_DIR, `${sessionId}.java`);
  const classFile = path.join(TEMP_DIR, `${sessionId}.class`);
  
  try {
    // Write Java code to file
    await fs.writeFile(javaFile, code);
    
    // Compile Java code
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
    
    // Execute test cases
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
    // Cleanup files
    try {
      await fs.unlink(javaFile).catch(() => {});
      await fs.unlink(classFile).catch(() => {});
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
  }
}

// Execute individual test case
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
  }
else if (problemType === 'contains-duplicate') {
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
    // Write and compile test runner
    await fs.writeFile(runnerFile, javaRunner);
    
    const compileCmd = `javac -cp "${TEMP_DIR}" "${runnerFile}"`;
    await execAsync(compileCmd, { timeout: EXECUTION_TIMEOUT });
    
    // Execute test
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
    
    // Compare results
   if (problemType === 'two-sum') {
    const expected = JSON.stringify(testCase.expected);
    const actual = actualOutput.replace(/\s/g, ''); // Remove spaces
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
    // Cleanup runner files
    try {
      await fs.unlink(runnerFile).catch(() => {});
      await fs.unlink(runnerClass).catch(() => {});
    } catch (error) {
      console.error('Runner cleanup error:', error);
    }
  }
}

// API endpoint for code execution
app.post('/api/execute-java', async (req, res) => {
  try {
    const { code, testCases, problemType } = req.body;
    
    // Validation
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    javaVersion: process.env.JAVA_VERSION || 'detected automatically'
  });
});

// Start server
async function startServer() {
  await ensureTempDir();
  
  // Cleanup old files every hour
  setInterval(cleanupOldFiles, 3600000);
  
  app.listen(PORT, () => {
    console.log(`🚀 Java execution server running on port ${PORT}`);
    console.log(`📁 Temp directory: ${TEMP_DIR}`);
    console.log(`⏱️  Execution timeout: ${EXECUTION_TIMEOUT}ms`);
  });
}

startServer().catch(console.error);