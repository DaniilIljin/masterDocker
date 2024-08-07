-- Create a table named 'tasks'
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,     -- Auto-incrementing ID
    description TEXT NOT NULL -- Description of the task
);

