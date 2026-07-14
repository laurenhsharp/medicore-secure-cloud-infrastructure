const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection configuration using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/postgres'
});

app.get('/', async (req, res) => {
  try {
    // Quick query to test database connectivity
    const dbRes = await pool.query('SELECT NOW()');
    res.json({
      status: "healthy",
      message: "Clinical Web Application is running smoothly.",
      database_time: dbRes.rows[0].now
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "unhealthy",
      message: "Could not connect to the database.",
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log(`Clinical app listening on port ${port}`);
});
