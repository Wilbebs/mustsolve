// File: src/app/problems/[slug]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { problems } from '@/data/problem';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Maximize2, RotateCcw, ChevronDown } from 'lucide-react';

type Language = 'JavaScript' | 'Python' | 'Java' | 'C++';

// Type definitions for different problem types
interface TwoSumTestCase {
  id: number;
  type: 'two-sum';
  nums: number[];
  target: number;
  expected: number[];
}

interface ValidAnagramTestCase {
  id: number;
  type: 'valid-anagram';
  s: string;
  t: string;
  expected: boolean;
}

interface ContainsDuplicateTestCase {
  id: number;
  type: 'contains-duplicate';
  nums: number[];
  expected: boolean;
}

type TestCase = TwoSumTestCase | ValidAnagramTestCase | ContainsDuplicateTestCase;

const CodeEditor = React.memo(({ 
  code, 
  setCode, 
  selectedLanguage, 
  handleLanguageChange, 
  handleReset, 
  isFullscreen, 
  setIsFullscreen,
  languageTemplates 
}: {
  code: string;
  setCode: (code: string) => void;
  selectedLanguage: Language;
  handleLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleReset: () => void;
  isFullscreen: boolean;
  setIsFullscreen: (fullscreen: boolean) => void;
  languageTemplates: { [key in Language]: string };
}) => {
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const lines = code.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      const extraIndent = currentLine.trim().endsWith('{') ? '    ' : '';
      
      const newValue = code.substring(0, start) + '\n' + currentIndent + extraIndent + code.substring(start);
      setCode(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + currentIndent.length + extraIndent.length;
      }, 0);
    }
  };

  return (
    <div className="w-1/2 flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-8"
            >
              {Object.keys(languageTemplates).map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 relative">
        <textarea
          ref={codeEditorRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full bg-gray-900 text-gray-100 font-mono text-sm pl-16 pr-4 py-4 resize-none focus:outline-none selection:bg-blue-500 selection:bg-opacity-30"
          style={{ lineHeight: '1.5', zIndex: 2 }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        
        {/* Line numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 border-r border-gray-700 flex flex-col text-gray-500 text-sm font-mono pt-4 pointer-events-none">
          {code.split('\n').map((_, index) => (
            <div key={`line-${index}`} className="px-2 text-right" style={{ height: '1.5em' }}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CodeEditor.displayName = 'CodeEditor';

// Simplified execution function - backend handles all the complexity now
const executeCode = (code: string, language: Language, testCase: TestCase, problemType: string): Promise<{ success: boolean; output: string; error?: string }> => {
  return new Promise(async (resolve) => {
    try {
      if (language === 'Java') {
        // Real Java execution via backend
        const response = await fetch('http://localhost:3001/api/execute-java', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            testCases: [testCase],
            problemType
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Network error' }));
          resolve({
            success: false,
            output: '',
            error: `Server Error\n\n${errorData.error || 'Failed to connect to execution server'}`
          });
          return;
        }

        const result = await response.json();
        
        if (result.error) {
          resolve({ success: false, output: '', error: result.error });
          return;
        }

        const testResult = result.results[0];
        
        let output = formatInput(testCase, problemType);
        
        if (testResult.error) {
          resolve({ success: false, output: '', error: testResult.error });
          return;
        }
        
        output += `Your Output:\n\n${testResult.actualOutput}\n\n`;
        output += `Expected output:\n\n${testResult.expectedOutput}`;
        
        resolve({
          success: testResult.success,
          output: output + (testResult.success ? '\n\n✅ Test case passed!' : '\n\n❌ Test case failed!')
        });

      } else if (language === 'JavaScript') {
        // Client-side JavaScript execution
        executeJavaScript(code, testCase, problemType, resolve);
      } else {
        // Placeholder for other languages
        executeOtherLanguage(testCase, problemType, resolve);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      resolve({
        success: false,
        output: '',
        error: `Network Error\n\nFailed to connect to backend server. Make sure the backend is running on http://localhost:3001\n\nError: ${errorMessage}`
      });
    }
  });
};

// Helper function to format input display
const formatInput = (testCase: TestCase, problemType: string): string => {
  if (problemType === 'two-sum') {
    const twoSumCase = testCase as TwoSumTestCase;
    return `Input:\nnums=[${twoSumCase.nums.join(',')}], target=${twoSumCase.target}\n\n`;
  } else if (problemType === 'valid-anagram') {
    const anagramCase = testCase as ValidAnagramTestCase;
    return `Input:\ns="${anagramCase.s}", t="${anagramCase.t}"\n\n`;
  } else if (problemType === 'contains-duplicate') {  
    const containsDuplicateCase = testCase as ContainsDuplicateTestCase;
    return `Input:\nnums=[${containsDuplicateCase.nums.join(',')}]\n\n`;
  }
  return '';
};

// Extracted JavaScript execution logic
    const executeJavaScript = (
      code: string, 
      testCase: TestCase, 
      problemType: string, 
      resolve: (value: { success: boolean; output: string; error?: string }) => void
    ) => {  try {
    const consoleOutput: string[] = [];
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      consoleOutput.push(args.map(arg => String(arg)).join(' '));
    };

    let result: any;
    let functionName: string = 'function';

    if (problemType === 'two-sum') {
      const twoSumCase = testCase as TwoSumTestCase;
      const func = new Function('nums', 'target', `
        ${code}
        return typeof twoSum !== 'undefined' ? twoSum(nums, target) : undefined;
      `);
      result = func(twoSumCase.nums, twoSumCase.target);
      functionName = 'twoSum';
    } else if (problemType === 'valid-anagram') {
      const anagramCase = testCase as ValidAnagramTestCase;
      const func = new Function('s', 't', `
        ${code}
        return typeof isAnagram !== 'undefined' ? isAnagram(s, t) : undefined;
      `);
      result = func(anagramCase.s, anagramCase.t);
      functionName = 'isAnagram';
    } else if (problemType === 'contains-duplicate') {  
      const containsDuplicateCase = testCase as ContainsDuplicateTestCase;
      const func = new Function('nums', `
        ${code}
        return typeof containsDuplicate !== 'undefined' ? containsDuplicate(nums) : undefined;
      `);
      result = func(containsDuplicateCase.nums);
      functionName = 'containsDuplicate';
    }
    
    console.log = originalConsoleLog;
    
    let output = '';
    
    if (consoleOutput.length > 0) {
      output += 'Console Output:\n' + consoleOutput.join('\n') + '\n\n';
    }
    
    if (result === undefined) {
      output += `No return value from ${functionName} function`;
      resolve({ success: false, output: output });
      return;
    }
    
    output += formatInput(testCase, problemType);
    
    if (problemType === 'two-sum') {
      const twoSumCase = testCase as TwoSumTestCase;
      const resultStr = JSON.stringify(result);
      const expectedStr = JSON.stringify(twoSumCase.expected);
      
      output += `Output: ${resultStr}\nExpected: ${expectedStr}\n\n`;
      
      const success = resultStr === expectedStr;
      output += success ? '✓ Test case passed' : '✗ Test case failed - Wrong Answer';
      resolve({ success, output });
    } else if (problemType === 'valid-anagram') {
      const anagramCase = testCase as ValidAnagramTestCase;
      
      output += `Output: ${result}\nExpected: ${anagramCase.expected}\n\n`;
      
      const success = result === anagramCase.expected;
      output += success ? '✓ Test case passed' : '✗ Test case failed - Wrong Answer';
      resolve({ success, output });
    } else if (problemType === 'contains-duplicate') {  
      const containsDuplicateCase = testCase as ContainsDuplicateTestCase;
      
      output += `Output: ${result}\nExpected: ${containsDuplicateCase.expected}\n\n`;
      
      const success = result === containsDuplicateCase.expected;
      output += success ? '✓ Test case passed' : '✗ Test case failed - Wrong Answer';
      resolve({ success, output });
    }
    
  } catch (execError: unknown) {
    const errorMessage = execError instanceof Error ? execError.message : 'Unknown error occurred';
    resolve({
      success: false,
      output: '',
      error: `Runtime Error\n\n${errorMessage}`
    });
  }
};

// Placeholder execution for other languages
    const executeOtherLanguage = (
      testCase: TestCase, 
      problemType: string, 
      resolve: (value: { success: boolean; output: string; error?: string }) => void
    ) => {  setTimeout(() => {
    const output = formatInput(testCase, problemType);
    
    if (problemType === 'two-sum') {
      const twoSumCase = testCase as TwoSumTestCase;
      resolve({
        success: true,
        output: output + `Output: [${twoSumCase.expected.join(',')}]\nExpected: [${twoSumCase.expected.join(',')}]\n\n✓ Test case passed`
      });
    } else if (problemType === 'valid-anagram') {
      const anagramCase = testCase as ValidAnagramTestCase;
      resolve({
        success: true,
        output: output + `Output: ${anagramCase.expected}\nExpected: ${anagramCase.expected}\n\n✓ Test case passed`
      });
    } else if (problemType === 'contains-duplicate') {  // ADD THIS
      const containsDuplicateCase = testCase as ContainsDuplicateTestCase;
      resolve({
        success: true,
        output: output + `Output: ${containsDuplicateCase.expected}\nExpected: ${containsDuplicateCase.expected}\n\n✓ Test case passed`
      });
    }
  }, 1000);
};

const TestCaseEditor = React.memo(({ 
  testCase, 
  onUpdate,
  problemType
}: { 
  testCase: TestCase,
  onUpdate: (id: number, field: string, value: any) => void,
  problemType: string
}) => {
  if (problemType === 'two-sum') {
    const twoSumCase = testCase as TwoSumTestCase;
    
    const parseArrayInput = (input: string): number[] => {
      try {
        const cleanInput = input.replace(/[\[\]]/g, '').trim();
        if (!cleanInput) return [];
        return cleanInput.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
      } catch {
        return [];
      }
    };

    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">nums =</label>
          <input
            type="text"
            defaultValue={`[${twoSumCase.nums.join(', ')}]`}
            onBlur={(e) => {
              const newNums = parseArrayInput(e.target.value);
              onUpdate(twoSumCase.id, 'nums', newNums);
            }}
            className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="[1, 2, 3]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">target =</label>
          <input
            type="number"
            defaultValue={twoSumCase.target}
            onBlur={(e) => {
              const newTarget = parseInt(e.target.value, 10);
              if (!isNaN(newTarget)) {
                onUpdate(twoSumCase.id, 'target', newTarget);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="9"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">expected =</label>
          <input
            type="text"
            defaultValue={`[${twoSumCase.expected.join(', ')}]`}
            onBlur={(e) => {
              const newExpected = parseArrayInput(e.target.value);
              onUpdate(twoSumCase.id, 'expected', newExpected);
            }}
            className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="[0, 1]"
          />
        </div>
      </div>
    );
  } else if (problemType === 'valid-anagram') {
    const anagramCase = testCase as ValidAnagramTestCase;
    
    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">s =</label>
          <input
            type="text"
            defaultValue={anagramCase.s}
            onBlur={(e) => {
              onUpdate(anagramCase.id, 's', e.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="anagram"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">t =</label>
          <input
            type="text"
            defaultValue={anagramCase.t}
            onBlur={(e) => {
              onUpdate(anagramCase.id, 't', e.target.value);
            }}
            className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="nagaram"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">expected =</label>
          <select
            defaultValue={anagramCase.expected.toString()}
            onChange={(e) => {
              onUpdate(anagramCase.id, 'expected', e.target.value === 'true');
            }}
            className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
      </div>
    );
  } 
  else if (problemType === 'contains-duplicate') {
  const containsDuplicateCase = testCase as ContainsDuplicateTestCase;
  
  const parseArrayInput = (input: string): number[] => {
    try {
      const cleanInput = input.replace(/[\[\]]/g, '').trim();
      if (!cleanInput) return [];
      return cleanInput.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">nums =</label>
        <input
          type="text"
          defaultValue={`[${containsDuplicateCase.nums.join(', ')}]`}
          onBlur={(e) => {
            const newNums = parseArrayInput(e.target.value);
            onUpdate(containsDuplicateCase.id, 'nums', newNums);
          }}
          className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="[1, 2, 3, 1]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">expected =</label>
        <select
          defaultValue={containsDuplicateCase.expected.toString()}
          onChange={(e) => {
            onUpdate(containsDuplicateCase.id, 'expected', e.target.value === 'true');
          }}
          className="w-full p-3 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
    </div>
  );
}
  
  return null;
});

TestCaseEditor.displayName = 'TestCaseEditor';

export default function ProblemPage() {
  const { slug } = useParams() as { slug: string };
  const problem = problems.find((p) => p.slug === slug);

  const [activeLeftTab, setActiveLeftTab] = useState('Question');
  const [activeBottomTab, setActiveBottomTab] = useState('Test Case');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Java');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [activeTestCase, setActiveTestCase] = useState(1);

const problemType = slug === 'two-sum' ? 'two-sum' : 
                   slug === 'valid-anagram' ? 'valid-anagram' : 
                   slug === 'contains-duplicate' ? 'contains-duplicate' : 
                   'two-sum';
                   
  const getLanguageTemplates = (problemType: string): { [key in Language]: string } => {
    if (problemType === 'two-sum') {
      return {
        'JavaScript': `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your solution here\n    \n};`,
        'Python': `def twoSum(nums, target):\n    """\n    :type nums: List[int]\n    :type target: int\n    :rtype: List[int]\n    """\n    # Write your solution here\n    pass`,
        'Java': `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
        'C++': `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};`
      };
    } else if (problemType === 'valid-anagram') {
      return {
        'JavaScript': `/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isAnagram = function(s, t) {\n    // Write your solution here\n    \n};`,
        'Python': `def isAnagram(s, t):\n    """\n    :type s: str\n    :type t: str\n    :rtype: bool\n    """\n    # Write your solution here\n    pass`,
        'Java': `class Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your solution here\n        \n    }\n}`,
        'C++': `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your solution here\n        \n    }\n};`
      };
    } else if (problemType === 'contains-duplicate') {
      return {
        'JavaScript': `/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar containsDuplicate = function(nums) {\n    // Write your solution here\n    \n};`,
        'Python': `def containsDuplicate(nums):\n    """\n    :type nums: List[int]\n    :rtype: bool\n    """\n    # Write your solution here\n    pass`,
        'Java': `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n        \n    }\n}`,
        'C++': `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write your solution here\n        \n    }\n};`
      };
    }
    return getLanguageTemplates('two-sum');
  };

  const languageTemplates = getLanguageTemplates(problemType);

  const getDefaultTestCases = (problemType: string): TestCase[] => {
    if (problemType === 'two-sum') {
      return [
        { id: 1, type: 'two-sum', nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { id: 2, type: 'two-sum', nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { id: 3, type: 'two-sum', nums: [3, 3], target: 6, expected: [0, 1] }
      ];
    } else if (problemType === 'valid-anagram') {
      return [
        { id: 1, type: 'valid-anagram', s: 'anagram', t: 'nagaram', expected: true },
        { id: 2, type: 'valid-anagram', s: 'rat', t: 'car', expected: false },
        { id: 3, type: 'valid-anagram', s: 'listen', t: 'silent', expected: true }
      ];
    } else if (problemType === 'contains-duplicate') {
      return [
        { id: 1, type: 'contains-duplicate', nums: [1, 2, 3, 1], expected: true },
        { id: 2, type: 'contains-duplicate', nums: [1, 2, 3, 4], expected: false },
        { id: 3, type: 'contains-duplicate', nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2], expected: true }
      ];
    }

    return getDefaultTestCases('two-sum');
  };

  const [testCases, setTestCases] = useState<TestCase[]>(getDefaultTestCases(problemType));

  const addTestCase = () => {
    const newId = Math.max(...testCases.map(tc => tc.id)) + 1;
    let newTestCase: TestCase;
    
    if (problemType === 'two-sum') {
      newTestCase = { id: newId, type: 'two-sum', nums: [1, 2], target: 3, expected: [0, 1] };
    } else if (problemType === 'valid-anagram') {
      newTestCase = { id: newId, type: 'valid-anagram', s: 'test', t: 'sett', expected: true };
    } else {
      newTestCase = { id: newId, type: 'two-sum', nums: [1, 2], target: 3, expected: [0, 1] };
    }
    
    setTestCases([...testCases, newTestCase]);
    setActiveTestCase(newId);
  };

  const updateTestCase = (id: number, field: string, value: any) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const deleteTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
      if (activeTestCase === id) {
        setActiveTestCase(testCases[0].id);
      }
    }
  };

  useEffect(() => {
    setCode(languageTemplates[selectedLanguage]);
  }, [selectedLanguage, problemType]);

  useEffect(() => {
    setTestCases(getDefaultTestCases(problemType));
    setActiveTestCase(1);
  }, [problemType]);

  useEffect(() => {
    setCode(languageTemplates['Java']);
  }, []);

  if (!problem) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Problem not found</h1>
          <p className="text-gray-600">The problem you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value as Language);
  };

  const handleReset = () => {
    setCode(languageTemplates[selectedLanguage]);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setActiveBottomTab('Output');
    
    const currentTestCase = testCases.find(tc => tc.id === activeTestCase);
    if (!currentTestCase) return;
    
    const result = await executeCode(code, selectedLanguage, currentTestCase, problemType);
    
    if (result.error) {
      setOutput(result.error);
    } else {
      setOutput(result.output);
    }
    
    setIsRunning(false);
  };

  const handleSubmit = () => {
    alert('Submission functionality will be implemented with backend integration');
  };

  const LeftSidebar = () => (
    <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
      <div className="border-b border-gray-200">
        <div className="flex">
          {['Question', 'Solution', 'Submissions', 'Notes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveLeftTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeLeftTab === tab
                  ? 'border-green-500 text-green-600 bg-green-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeLeftTab === 'Question' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
                <span className={`px-2 py-1 text-sm font-medium rounded ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {problem.difficulty}
                </span>
              </div>
              
              <div className="prose max-w-none">
                <div className="text-gray-700 mb-6 whitespace-pre-wrap">
                  {problem.description}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Example:</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-mono text-sm">
                        <div><strong>Input:</strong> {problem.exampleInput}</div>
                        <div><strong>Output:</strong> {problem.exampleOutput}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLeftTab === 'Solution' && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">💡</div>
            <p className="text-gray-500">Solution content will be available here</p>
          </div>
        )}

        {activeLeftTab === 'Submissions' && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">📝</div>
            <p className="text-gray-500">Your submission history will appear here</p>
          </div>
        )}

        {activeLeftTab === 'Notes' && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">📋</div>
            <p className="text-gray-500">Take notes about this problem</p>
          </div>
        )}
      </div>
    </div>
  );

  const BottomPanel = () => (
    <div className="h-64 bg-white border-t border-gray-200 flex flex-col">
      <div className="border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex">
          {['Test Case', 'Output'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveBottomTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeBottomTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRunning ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Run
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeBottomTab === 'Test Case' && (
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              {testCases.map((testCase) => (
                <div key={testCase.id} className="flex items-center">
                  <button
                    onClick={() => setActiveTestCase(testCase.id)}
                    className={`px-3 py-1.5 text-sm rounded-l border ${
                      activeTestCase === testCase.id
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Case {testCase.id}
                  </button>
                  {testCases.length > 1 && (
                    <button
                      onClick={() => deleteTestCase(testCase.id)}
                      className={`px-2 py-1.5 text-sm rounded-r border-l-0 border text-red-600 hover:bg-red-50 ${
                        activeTestCase === testCase.id
                          ? 'border-green-300'
                          : 'border-gray-300'
                      }`}
                      title="Delete test case"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addTestCase}
                className="px-3 py-1.5 text-sm rounded border border-dashed border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-500"
                title="Add test case"
              >
                + Add
              </button>
            </div>

            {(() => {
              const currentTest = testCases.find(tc => tc.id === activeTestCase);
              if (!currentTest) return null;
              
              return <TestCaseEditor testCase={currentTest} onUpdate={updateTestCase} problemType={problemType} />;
            })()}
          </div>
        )}

        {activeBottomTab === 'Output' && (
          <div className="h-full">
            {output ? (
              <div className="h-full overflow-y-auto">
                <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap break-words p-2">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="text-gray-500 text-sm p-4">
                Click "Run" to see the output of your code
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />
        <CodeEditor 
          code={code}
          setCode={setCode}
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
          handleReset={handleReset}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          languageTemplates={languageTemplates}
        />
      </div>
      
      <BottomPanel />
    </div>
  );
}