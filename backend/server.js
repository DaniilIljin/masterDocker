const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;

// Create a new client instance with connection details
// const client = new Client({
//   user: 'user',             // PostgreSQL username
//   host: 'localhost',       // PostgreSQL server host (adjust if using Docker network)
//   database: 'testdb',      // PostgreSQL database name
//   password: 'db',          // PostgreSQL password
//   port: 5432,              // PostgreSQL port (as defined in Dockerfile)
// });

// DB_HOST: db  # Use service name as the hostname
// POSTGRES_USER: user
// POSTGRES_PASSWORD: db
// POSTGRES_DB: testdb
// DB_PORT: 5432
// PORT: 3000


const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,  // Use the service name defined in Docker Compose
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to create a new task
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  try {
    const result = await pool.query('INSERT INTO tasks (description) VALUES ($1) RETURNING *', [description]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});