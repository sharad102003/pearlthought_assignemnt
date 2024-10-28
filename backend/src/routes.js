const express = require('express');
const pool = require('./db'); // Assumes `db.js` is set up to export your PostgreSQL connection
const router = express.Router();

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a task by ID
router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/tasks', async (req, res) => {
    console.log("Incoming Request Body:", req.body); // Log the entire body
    const { title, description, due_date, recurrenceOptions } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    try {
        const result = await pool.query(
            'INSERT INTO tasks (title, description, due_date, recurrenceOptions) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, due_date, recurrenceOptions]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




// Update a task
router.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, recurring, recurrenceOptions } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, recurring = $2, recurrenceOptions = $3 WHERE id = $4 RETURNING *',
            [title, recurring, recurrenceOptions, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.send('Task deleted');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
