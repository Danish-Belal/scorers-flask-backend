const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Important for NeonDB
  },
});

// Optional: simple test function to confirm DB works
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connected to DB:', res.rows[0]);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
}

// Run on load
// testConnection();

module.exports = pool;
