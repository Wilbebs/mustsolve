// mustsolve-backend/src/services/database.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log('✅ Database connected successfully:', result.rows[0].now);
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    return false;
  }
};

const getAllProblems = async () => {
  const query = `
    SELECT 
      id,
      slug,
      title,
      difficulty,
      category,
      is_active,
      created_at
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

const getProblemBySlug = async (slug) => {
  const problemQuery = `
    SELECT * FROM problems WHERE slug = $1 AND is_active = true
  `;
  
  const starterCodeQuery = `
    SELECT language, code 
    FROM starter_code 
    WHERE problem_id = $1 
    ORDER BY language
  `;
  
  const testCasesQuery = `
    SELECT 
      input_data,
      expected_output,
      is_sample,
      explanation,
      execution_order
    FROM test_cases 
    WHERE problem_id = $1 
    ORDER BY execution_order, created_at
  `;

  try {
    const problemResult = await pool.query(problemQuery, [slug]);
    if (problemResult.rows.length === 0) {
      return null;
    }
    
    const problem = problemResult.rows[0];
    
    const starterCodeResult = await pool.query(starterCodeQuery, [problem.id]);
    const starterCode = {};
    starterCodeResult.rows.forEach(row => {
      starterCode[row.language] = row.code;
    });
    
    const testCasesResult = await pool.query(testCasesQuery, [problem.id]);
    const testCases = testCasesResult.rows.map(row => ({
      inputData: row.input_data,
      expectedOutput: row.expected_output,
      isSample: row.is_sample,
      explanation: row.explanation,
      executionOrder: row.execution_order
    }));
    
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
      starterCode,
      testCases,
      isActive: problem.is_active,
      createdAt: problem.created_at,
      updatedAt: problem.updated_at
    };
  } catch (err) {
    console.error('Error fetching problem by slug:', err);
    throw new Error(`Failed to fetch problem: ${slug}`);
  }
};

const getAllCategories = async () => {
  const query = `
    SELECT 
      id,
      name,
      description,
      color_gradient,
      display_order,
      (SELECT COUNT(*) FROM problems WHERE category = categories.name AND is_active = true) as problem_count
    FROM categories 
    ORDER BY display_order, name
  `;
  
  try {
    const result = await pool.query(query);
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      colorGradient: row.color_gradient,
      displayOrder: row.display_order,
      problemCount: parseInt(row.problem_count)
    }));
  } catch (err) {
    console.error('Error fetching categories:', err);
    throw new Error('Failed to fetch categories');
  }
};

const getDashboardStats = async () => {
  const query = `
    SELECT 
      COUNT(*) as total_problems,
      COUNT(CASE WHEN difficulty = 'Easy' THEN 1 END) as easy_count,
      COUNT(CASE WHEN difficulty = 'Medium' THEN 1 END) as medium_count,
      COUNT(CASE WHEN difficulty = 'Hard' THEN 1 END) as hard_count,
      COUNT(DISTINCT category) as total_categories
    FROM problems 
    WHERE is_active = true
  `;
  
  try {
    const result = await pool.query(query);
    const stats = result.rows[0];
    return {
      totalProblems: parseInt(stats.total_problems),
      easyCount: parseInt(stats.easy_count),
      mediumCount: parseInt(stats.medium_count),
      hardCount: parseInt(stats.hard_count),
      totalCategories: parseInt(stats.total_categories)
    };
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    throw new Error('Failed to fetch dashboard statistics');
  }
};

const closePool = async () => {
  await pool.end();
  console.log('Database pool closed');
};

module.exports = {
  testConnection,
  getAllProblems,
  getProblemBySlug,
  getAllCategories,
  getDashboardStats,
  closePool
};