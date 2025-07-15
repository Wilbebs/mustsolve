// File: src/app/problems/[slug]/page.tsx
'use client';

import { problems } from '@/data/problem';
import { useParams } from 'next/navigation';

export default function ProblemPage() {
  const { slug } = useParams() as { slug: string };
  const problem = problems.find((p) => p.slug === slug);

  if (!problem) return <div className="p-10 text-center">Problem not found</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">{problem.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{problem.difficulty}</p>
        <pre className="bg-gray-100 p-4 rounded mb-6 whitespace-pre-wrap">
          {problem.description}
        </pre>
        <h2 className="font-semibold">Example</h2>
        <div className="bg-gray-100 p-3 rounded mb-2">
          <strong>Input:</strong> {problem.exampleInput}
          <br />
          <strong>Output:</strong> {problem.exampleOutput}
        </div>
        <h2 className="font-semibold">Starter Code</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          {problem.starterCode}
        </pre>
      </div>
    </div>
  );
}
