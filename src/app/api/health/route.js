// 1. src/app/api/health/route.js
import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/database';

export async function GET() {
  try {
    const isDbConnected = await testConnection();
    return NextResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: isDbConnected ? 'Connected' : 'Disconnected',
      version: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'Error',
      timestamp: new Date().toISOString(),
      database: 'Error',
      error: error.message
    }, { status: 503 });
  }
}

// 2. src/app/api/problems/route.js
import { NextResponse } from 'next/server';
import { getAllProblems } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');
    
    const filters = {};
    if (category) filters.category = category;
    if (difficulty) filters.difficulty = difficulty;
    if (search) filters.search = search;
    
    const problems = await getAllProblems(filters);
    
    return NextResponse.json({
      success: true,
      data: problems,
      total: problems.length
    });
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch problems',
      error: error.message
    }, { status: 500 });
  }
}

// 3. src/app/api/problems/[slug]/route.js
import { NextResponse } from 'next/server';
import { getProblemBySlug } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { slug } = params;
    const problem = await getProblemBySlug(slug);
    
    if (!problem) {
      return NextResponse.json({
        success: false,
        message: 'Problem not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: problem
    });
  } catch (error) {
    console.error('Error fetching problem:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch problem',
      error: error.message
    }, { status: 500 });
  }
}

// 4. src/lib/database.js (move your database functions here)
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected successfully:', result.rows[0].now);
    return true;
  } catch (err) {
    console.error('Database connection error:', err.message);
    return false;
  }
};

export const getAllProblems = async () => {
  const query = `
    SELECT 
      id, slug, title, difficulty, category, is_active, created_at
    FROM problems 
    WHERE is_active = true 
    ORDER BY created_at ASC
  `;
  
  try {
    const result = await pool.query(query);
    return result.rows.map(row => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      difficulty: row.difficulty,
      category: row.category,
      isActive: row.is_active,
      createdAt: row.created_at
    }));
  } catch (err) {
    console.error('Error fetching problems:', err);
    throw new Error('Failed to fetch problems');
  }
};

export const getProblemBySlug = async (slug) => {
  const problemQuery = `SELECT * FROM problems WHERE slug = $1 AND is_active = true`;
  
  try {
    const problemResult = await pool.query(problemQuery, [slug]);
    if (problemResult.rows.length === 0) {
      return null;
    }
    
    const problem = problemResult.rows[0];
    return {
      id: problem.id,
      slug: problem.slug,
      title: problem.title,
      difficulty: problem.difficulty,
      category: problem.category,
      description: problem.problem_statement,
      constraints: problem.constraints,
      hints: problem.hints || [],
      exampleInput: problem.example_input,
      exampleOutput: problem.example_output,
      isActive: problem.is_active,
      createdAt: problem.created_at,
      updatedAt: problem.updated_at
    };
  } catch (err) {
    console.error('Error fetching problem by slug:', err);
    throw new Error(`Failed to fetch problem: ${slug}`);
  }
};