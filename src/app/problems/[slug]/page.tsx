// File: src/app/problems/[slug]/page.tsx - Fixed version without infinite loop

'use client';

import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Maximize2, RotateCcw, ChevronDown } from 'lucide-react';
import { useProblem, useCodeExecution } from '@/hooks/useApi';
import ReactMarkdown from 'react-markdown';

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
  } else if (problemType === 'contains-duplicate') {
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
  
  // Fetch problem from database
  const { problem, loading, error, refetch } = useProblem(slug);
  const { executeCode, loading: executing } = useCodeExecution();

  const [activeLeftTab, setActiveLeftTab] = useState('Question');
  const [activeBottomTab, setActiveBottomTab] = useState('Test Case');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Java');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [activeTestCase, setActiveTestCase] = useState(1);

  // Determine problem type from slug
  const problemType = slug === 'two-sum' ? 'two-sum' : 
                   slug === 'valid-anagram' ? 'valid-anagram' : 
                   slug === 'contains-duplicate' ? 'contains-duplicate' : 
                   'two-sum';

  // Language templates - use from database or fallback
  const getLanguageTemplates = (): { [key in Language]: string } => {
    // If we have starter code from database, use it
    if (problem?.starterCode && Object.keys(problem.starterCode).length > 0) {
      return {
        'JavaScript': problem.starterCode.JavaScript || problem.starterCode.javascript || '',
        'Python': problem.starterCode.Python || problem.starterCode.python || '',
        'Java': problem.starterCode.Java || problem.starterCode.java || '',
        'C++': problem.starterCode['C++'] || problem.starterCode.cpp || ''
      };
    }

    // Fallback templates based on problem type
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
    
    // Default fallback
    return {
      'JavaScript': '// Write your solution here',
      'Python': '# Write your solution here',
      'Java': 'class Solution {\n    // Write your solution here\n}',
      'C++': 'class Solution {\n    // Write your solution here\n};'
    };
  };

  // Convert database test cases to frontend format
  const getTestCasesFromProblem = (): TestCase[] => {
    if (!problem?.testCases || problem.testCases.length === 0) {
      // Fallback test cases
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
    }

    // Convert database test cases
    return problem.testCases.map((testCase: any, index: number) => {
      if (problemType === 'two-sum') {
        return {
          id: index + 1,
          type: 'two-sum' as const,
          nums: testCase.inputData?.nums || [2, 7, 11, 15],
          target: testCase.inputData?.target || 9,
          expected: testCase.expectedOutput || [0, 1]
        };
      } else if (problemType === 'valid-anagram') {
        return {
          id: index + 1,
          type: 'valid-anagram' as const,
          s: testCase.inputData?.s || 'anagram',
          t: testCase.inputData?.t || 'nagaram',
          expected: testCase.expectedOutput || true
        };
      } else if (problemType === 'contains-duplicate') {
        return {
          id: index + 1,
          type: 'contains-duplicate' as const,
          nums: testCase.inputData?.nums || [1, 2, 3, 1],
          expected: testCase.expectedOutput || true
        };
      }
      return {
        id: index + 1,
        type: 'two-sum' as const,
        nums: [2, 7, 11, 15],
        target: 9,
        expected: [0, 1]
      };
    });
  };

  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [languageTemplates, setLanguageTemplates] = useState<{ [key in Language]: string }>({
    'JavaScript': '',
    'Python': '',
    'Java': '',
    'C++': ''
  });

  // Initialize data when problem loads - FIXED: proper dependency array
  useEffect(() => {
    if (problem) {
      console.log('Setting up problem data for:', problem.title);
      const templates = getLanguageTemplates();
      const cases = getTestCasesFromProblem();
      
      setLanguageTemplates(templates);
      setTestCases(cases);
      setCode(templates[selectedLanguage] || templates['Java'] || '');
    }
  }, [problem?.id]); // FIXED: Only depend on problem.id to avoid infinite loop

  // Update code when language changes - FIXED: separate useEffect
  useEffect(() => {
    if (languageTemplates[selectedLanguage]) {
      setCode(languageTemplates[selectedLanguage]);
    }
  }, [selectedLanguage, languageTemplates]);

  const addTestCase = () => {
    const newId = Math.max(...testCases.map(tc => tc.id)) + 1;
    let newTestCase: TestCase;
    
    if (problemType === 'two-sum') {
      newTestCase = { id: newId, type: 'two-sum', nums: [1, 2], target: 3, expected: [0, 1] };
    } else if (problemType === 'valid-anagram') {
      newTestCase = { id: newId, type: 'valid-anagram', s: 'test', t: 'sett', expected: true };
    } else {
      newTestCase = { id: newId, type: 'contains-duplicate', nums: [1, 2, 3, 1], expected: true };
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

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value as Language);
  };

  const handleReset = () => {
    setCode(languageTemplates[selectedLanguage] || '');
    setOutput('');
  };

  const handleRun = async () => {
    setActiveBottomTab('Output');
    
    const currentTestCase = testCases.find(tc => tc.id === activeTestCase);
    if (!currentTestCase) return;
    
    try {
      const result = await executeCode({
        code,
        testCases: [currentTestCase],
        problemType,
        language: selectedLanguage
      });
      
      if (result.error) {
        setOutput(result.error);
      } else if (result.results && result.results.length > 0) {
        const testResult = result.results[0];
        
        let output = `Input:\n`;
        
        if (problemType === 'two-sum') {
          const twoSumCase = currentTestCase as TwoSumTestCase;
          output += `nums=[${twoSumCase.nums.join(',')}], target=${twoSumCase.target}\n\n`;
        } else if (problemType === 'valid-anagram') {
          const anagramCase = currentTestCase as ValidAnagramTestCase;
          output += `s="${anagramCase.s}", t="${anagramCase.t}"\n\n`;
        } else if (problemType === 'contains-duplicate') {
          const containsDuplicateCase = currentTestCase as ContainsDuplicateTestCase;
          output += `nums=[${containsDuplicateCase.nums.join(',')}]\n\n`;
        }
        
        if (testResult.error) {
          setOutput(testResult.error);
          return;
        }
        
        output += `Your Output:\n${testResult.actualOutput}\n\n`;
        output += `Expected:\n${testResult.expectedOutput}`;
        output += testResult.success ? '\n\n✅ Test case passed!' : '\n\n❌ Test case failed!';
        
        setOutput(output);
      }
    } catch (error) {
      console.error('Code execution error:', error);
      setOutput(`Execution Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = () => {
    alert('Submission functionality will be implemented with backend integration');
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading problem from database...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Problem Not Found</h1>
          <p className="text-gray-600 mb-4">Could not load problem from database.</p>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                  <div className="prose prose-gray max-w-none [&>*]:mb-3 [&>h3]:text-base [&>h3]:font-semibold [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:rounded">
                    <ReactMarkdown>{problem.description}</ReactMarkdown>
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

                  {problem.constraints && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Constraints:</h3>
                      <div className="text-gray-700 whitespace-pre-wrap">{problem.constraints}</div>
                    </div>
                  )}

                  {problem.hints && problem.hints.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Hints:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {problem.hints.map((hint: string, index: number) => (
                          <li key={index} className="text-gray-700">{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
            disabled={executing}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {executing ? (
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