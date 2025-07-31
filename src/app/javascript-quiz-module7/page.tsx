// File: src/app/javascript-quiz-module7/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';

export default function JavaScriptQuizModule7() {
  const quizRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Custom questions for MustSolve - Data Structures & Algorithms focused
    var myQuestions = [
      {
        question: "What is the time complexity of the optimal Two Sum solution using a hash map?",
        answers: {
          a: 'O(n²)',
          b: 'O(n)',
          c: 'O(log n)'
        },
        correctAnswer: 'b'
      },
      {
        question: "Which data structure is best for the Two Sum problem's optimal solution?",
        answers: {
          a: 'Array',
          b: 'Stack',
          c: 'Hash Map'
        },
        correctAnswer: 'c'
      },
      {
        question: "In JavaScript, which method adds an element to the end of an array?",
        answers: {
          a: 'push()',
          b: 'pop()',
          c: 'shift()'
        },
        correctAnswer: 'a'
      },
      {
        question: "What does the following return: [1,2,3].indexOf(2)?",
        answers: {
          a: '2',
          b: '1',
          c: 'undefined'
        },
        correctAnswer: 'b'
      },
      {
        question: "Which is the correct way to declare a Map in JavaScript?",
        answers: {
          a: 'var map = new Map();',
          b: 'var map = Map();',
          c: 'var map = {};'
        },
        correctAnswer: 'a'
      }
    ];

    var quizContainer = quizRef.current;
    var resultsContainer = resultsRef.current;
    var submitButton = submitRef.current;

    if (!quizContainer || !resultsContainer || !submitButton) return;

    function generateQuiz(questions: any[], quizContainer: HTMLElement, resultsContainer: HTMLElement, submitButton: HTMLElement) {
      function showQuestions(questions: any[], quizContainer: HTMLElement) {
        var output = [];
        var answers;

        for(var i=0; i<questions.length; i++){
          answers = [];

          for(let letter in questions[i].answers){
            answers.push(
              '<label class="answer-label">'
                + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                + '<span class="answer-text">' + letter + ': ' + questions[i].answers[letter] + '</span>'
              + '</label>'
            );
          }

          output.push(
            '<div class="question-block">' 
              + '<div class="question-text">Question ' + (i+1) + ': ' + questions[i].question + '</div>'
              + '<div class="answers-container">' + answers.join('') + '</div>'
            + '</div>'
          );
        }

        quizContainer.innerHTML = output.join('');
      }

      function showResults(questions: any[], quizContainer: HTMLElement, resultsContainer: HTMLElement) {
        var answerContainers = quizContainer.querySelectorAll('.answers-container');
        var userAnswer = '';
        var numCorrect = 0;
        
        for(var i=0; i<questions.length; i++){
          userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked') as HTMLInputElement)?.value || '';
          
          if(userAnswer===questions[i].correctAnswer){
            numCorrect++;
            (answerContainers[i] as HTMLElement).style.backgroundColor = '#d4edda';
            (answerContainers[i] as HTMLElement).style.borderLeft = '4px solid #28a745';
          } else {
            (answerContainers[i] as HTMLElement).style.backgroundColor = '#f8d7da';
            (answerContainers[i] as HTMLElement).style.borderLeft = '4px solid #dc3545';
          }
        }

        const percentage = Math.round((numCorrect / questions.length) * 100);
        resultsContainer.innerHTML = `
          <div class="results-summary">
            <h3>Quiz Results</h3>
            <p class="score">Score: ${numCorrect} out of ${questions.length} (${percentage}%)</p>
            <p class="performance">${percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good job!' : '📚 Keep studying!'}</p>
          </div>
        `;
      }

      showQuestions(questions, quizContainer);
      
      submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
      }
    }

    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JavaScript Quiz - Module 7
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Data Structures & Algorithm Fundamentals
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 inline-block">
            <p className="text-green-800 font-medium">
              📚 Test your knowledge of JavaScript concepts used in coding interviews
            </p>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div 
            ref={quizRef}
            id="quiz"
            className="quiz-container"
          ></div>
          
          <div className="text-center mt-8">
            <button
              ref={submitRef}
              id="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Submit Quiz
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div 
          ref={resultsRef}
          id="results"
          className="results-container"
        ></div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Instructions:</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Select one answer for each question</li>
            <li>• Click "Submit Quiz" when you're ready to see your results</li>
            <li>• Green highlighting indicates correct answers</li>
            <li>• Red highlighting indicates incorrect answers</li>
            <li>• Aim for 80% or higher for excellent performance!</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .question-block {
          margin-bottom: 3rem;
          padding: 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .question-block::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .question-block:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .question-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          position: relative;
          padding-left: 1rem;
        }
        
        .question-text::before {
          content: '🤔';
          position: absolute;
          left: -0.5rem;
          top: 0;
          font-size: 1.5rem;
        }
        
        .answers-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 0.75rem;
          background: rgba(249, 250, 251, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(229, 231, 235, 0.3);
          transition: all 0.3s ease;
        }
        
        .answer-label {
          display: flex;
          align-items: center;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .answer-label::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
          transition: left 0.5s;
        }
        
        .answer-label:hover {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-color: #10b981;
          transform: translateX(8px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
        }
        
        .answer-label:hover::before {
          left: 100%;
        }
        
        .answer-label input[type="radio"] {
          margin-right: 1rem;
          transform: scale(1.3);
          accent-color: #10b981;
        }
        
        .answer-text {
          font-size: 1.1rem;
          color: #374151;
          line-height: 1.5;
          font-weight: 500;
        }
        
        .results-summary {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          text-align: center;
          border: 1px solid #d1fae5;
          position: relative;
          overflow: hidden;
        }
        
        .results-summary::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .results-summary h3 {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(90deg, #059669, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .score {
          font-size: 1.5rem;
          font-weight: 700;
          color: #059669;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(5, 150, 105, 0.1);
          position: relative;
        }
        
        .performance {
          font-size: 1.25rem;
          color: #6b7280;
          font-weight: 600;
          position: relative;
        }
        
        /* Fancy button styling */
        #submit {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        #submit:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
          transform: translateY(-2px);
        }
        
        #submit:active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }
        
        /* Enhanced spacing between sections */
        .quiz-container > * + * {
          margin-top: 2.5rem;
        }
        
        /* Correct/Incorrect answer styling enhancements */
        .answers-container[style*="background-color: rgb(212, 237, 218)"] {
          background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%) !important;
          border-left: 6px solid #28a745 !important;
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.2);
          animation: successPulse 0.6s ease-out;
        }
        
        .answers-container[style*="background-color: rgb(248, 215, 218)"] {
          background: linear-gradient(135deg, #f8d7da 0%, #f1b0b7 100%) !important;
          border-left: 6px solid #dc3545 !important;
          box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
          animation: errorShake 0.6s ease-out;
        }
        
        @keyframes successPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}