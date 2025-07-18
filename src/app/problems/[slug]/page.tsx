// File: src/app/problems/[slug]/page.tsx
'use client';

import { problems } from '@/data/problem';
import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Maximize2, RotateCcw, ChevronDown } from 'lucide-react';

type Language = 'JavaScript' | 'Python' | 'Java' | 'C++';

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

  // Handle tab key and other editor functionality
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // Insert tab (4 spaces)
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newValue);
      
      // Set cursor position after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
    
    // Handle auto-indentation on Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const lines = code.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      
      // Calculate indentation
      const indentMatch = currentLine.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';
      
      // Add extra indent for opening braces
      const extraIndent = currentLine.trim().endsWith('{') ? '    ' : '';
      
      const newValue = code.substring(0, start) + '\n' + currentIndent + extraIndent + code.substring(start);
      setCode(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + currentIndent.length + extraIndent.length;
      }, 0);
    }
  };

  // Simple syntax highlighting function
  const getSyntaxHighlightedCode = (code: string, language: Language) => {
    if (language === 'JavaScript') {
      return code
        .replace(/(\/\*[\s\S]*?\*\/|\/\/.*$)/gm, '<span style="color: #6A9955;">$1</span>') // comments
        .replace(/\b(var|let|const|function|return|if|else|for|while|class|new|this)\b/g, '<span style="color: #569CD6;">$1</span>') // keywords
        .replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #569CD6;">$1</span>') // literals
        .replace(/"([^"\\]|\\.)*"/g, '<span style="color: #CE9178;">$&</span>') // strings
        .replace(/'([^'\\]|\\.)*'/g, '<span style="color: #CE9178;">$&</span>') // strings
        .replace(/\b\d+\b/g, '<span style="color: #B5CEA8;">$&</span>'); // numbers
    }
    return code;
  };

  return (
    <div className="w-1/2 flex flex-col bg-gray-900">
      {/* Editor Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
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
          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Fullscreen Button */}
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
        {/* Syntax highlighted background */}
        <div 
          className="absolute inset-0 pl-16 pr-4 py-4 font-mono text-sm pointer-events-none whitespace-pre-wrap break-words overflow-hidden"
          style={{ 
            lineHeight: '1.5',
            color: 'transparent',
            zIndex: 1
          }}
          dangerouslySetInnerHTML={{ 
            __html: getSyntaxHighlightedCode(code, selectedLanguage) 
          }}
        />
        
        {/* Actual textarea (visible text) */}
        <textarea
          ref={codeEditorRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full bg-gray-900 text-gray-100 font-mono text-sm pl-16 pr-4 py-4 resize-none focus:outline-none selection:bg-blue-500 selection:bg-opacity-30"
          style={{ 
            lineHeight: '1.5',
            zIndex: 2
          }}
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

const executeCode = (code: string, language: Language, testCase: any): Promise<{ success: boolean; output: string; error?: string }> => {
  return new Promise((resolve) => {
    // Simulate execution delay
    setTimeout(() => {
      try {
        // Check for compilation errors first
        if (language === 'Java' && code.includes('System.out.println')) {
          resolve({
            success: false,
            output: '',
            error: `Compilation Error\n\nSolution.java:4: error: cannot find symbol\n        System.out.println("Hello World");\n        ^\n  symbol:   variable System\n  location: class Solution\n1 error`
          });
          return;
        }
        
        if (language === 'JavaScript') {
          // Check for syntax errors
          if (code.includes('system.out.print')) {
            resolve({
              success: false,
              output: '',
              error: `ReferenceError\n\nReferenceError: system is not defined\n    at twoSum (Solution.js:5:5)\n    at main (Solution.js:10:1)`
            });
            return;
          }
          
          // Try to execute JavaScript code
          try {
            const func = new Function('nums', 'target', `
              ${code}
              return twoSum(nums, target);
            `);
            
            const result = func(testCase.nums, testCase.target);
            const resultStr = JSON.stringify(result);
            const expectedStr = JSON.stringify(testCase.expected);
            
            if (resultStr === expectedStr) {
              resolve({
                success: true,
                output: `Input: nums = [${testCase.nums.join(',')}], target = ${testCase.target}\nOutput: ${resultStr}\nExpected: ${expectedStr}\n\n✓ Test case passed`
              });
            } else {
              resolve({
                success: false,
                output: `Input: nums = [${testCase.nums.join(',')}], target = ${testCase.target}\nOutput: ${resultStr}\nExpected: ${expectedStr}\n\n✗ Test case failed - Wrong Answer`
              });
            }
          } catch (execError: unknown) {
            const errorMessage = execError instanceof Error ? execError.message : 'Unknown error occurred';
            resolve({
              success: false,
              output: '',
              error: `Runtime Error\n\n${errorMessage}`
            });
          }
        } else if (language === 'Java') {
          // Simulate Java execution - check for correct solution pattern
          if (code.includes('HashMap') && code.includes('containsKey') && code.includes('complement')) {
            // Correct solution
            resolve({
              success: true,
              output: `Input: nums = [${testCase.nums.join(',')}], target = ${testCase.target}\nOutput: [${testCase.expected.join(',')}]\nExpected: [${testCase.expected.join(',')}]\n\n✓ Test case passed`
            });
          } else if (code.includes('return new int[]{0, 1}')) {
            // Hardcoded wrong solution
            resolve({
              success: false,
              output: `Input: nums = [${testCase.nums.join(',')}], target = ${testCase.target}\nOutput: [0,1]\nExpected: [${testCase.expected.join(',')}]\n\n✗ Test case failed - Wrong Answer`
            });
          } else {
            // Generic wrong solution
            resolve({
              success: false,
              output: `Input: nums = [${testCase.nums.join(',')}], target = ${testCase.target}\nOutput: []\nExpected: [${testCase.expected.join(',')}]\n\n✗ Test case failed - Wrong Answer`
            });
          }
        } else {
          // Other languages - basic simulation
          resolve({
            success: true,
            output: `Input: nums = [${testCase.nums.join(',')}], target = ${testCase.target}\nOutput: [${testCase.expected.join(',')}]\nExpected: [${testCase.expected.join(',')}]\n\n✓ Test case passed`
          });
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        resolve({
          success: false,
          output: '',
          error: `Runtime Error\n\n${errorMessage}`
        });
      }
    }, 1000);
  });
};


export default function ProblemPage() {
  const { slug } = useParams() as { slug: string };
  const problem = problems.find((p) => p.slug === slug);

  // State management
  const [activeLeftTab, setActiveLeftTab] = useState('Question');
  const [activeBottomTab, setActiveBottomTab] = useState('Test Case');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Java');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [activeTestCase, setActiveTestCase] = useState(1);
  // Language templates - you can expand this with your enhanced schema
  const languageTemplates: { [key in Language]: string } = {
    'JavaScript': `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
};`,
    'Python': `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
    'Java': `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
    }
}`,
    'C++': problem?.starterCode || `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`
  };

  // Mock test cases - replace with your enhanced schema data
  const testCases = [
    { id: 1, nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { id: 2, nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { id: 3, nums: [3, 3], target: 6, expected: [0, 1] }
  ];

  // Initialize code when language changes
useEffect(() => {
    setCode(languageTemplates[selectedLanguage as Language]);
  }, [selectedLanguage]);

  // Initialize with JavaScript template on mount only
  useEffect(() => {
    setCode(languageTemplates['JavaScript']);
  }, []); // Empty dependency array - runs only once on mount


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
    setCode(languageTemplates[selectedLanguage as keyof typeof languageTemplates]);
    setOutput('');
  };

const handleRun = async () => {
  setIsRunning(true);
  setActiveBottomTab('Output');
  
  const currentTestCase = testCases[activeTestCase - 1];
  const result = await executeCode(code, selectedLanguage, currentTestCase);
  
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
      {/* Tab Navigation */}
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

      {/* Tab Content */}
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
      {/* Panel Header */}
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
          {/* Run Button */}
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

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeBottomTab === 'Test Case' && (
          <div className="space-y-4">
            {/* Test Case Tabs */}
            <div className="flex gap-2">
              {testCases.map((testCase) => (
                <button
                  key={testCase.id}
                  onClick={() => setActiveTestCase(testCase.id)}
                  className={`px-3 py-1.5 text-sm rounded border ${
                    activeTestCase === testCase.id
                      ? 'bg-green-100 border-green-300 text-green-700'
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Case {testCase.id}
                </button>
              ))}
            </div>

            {/* Current Test Case Display */}
            {(() => {
              const currentTest = testCases[activeTestCase - 1];
              return (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">nums =</label>
                    <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
                      [{currentTest.nums.join(', ')}]
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">target =</label>
                    <div className="bg-gray-50 p-3 rounded border font-mono text-sm">
                      {currentTest.target}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeBottomTab === 'Output' && (
          <div className="h-full">
            {output ? (
              <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">
                {output}
              </pre>
            ) : (
              <div className="text-gray-500 text-sm">
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
      {/* Main Content Area */}
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
      
      {/* Bottom Panel */}
      <BottomPanel />
    </div>
  );
}