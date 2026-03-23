const express = require('express');
const router = express.Router();
const db = require('../db');

// Basic email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /api/people
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM people ORDER BY full_name ASC');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/people/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM people WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'PERSON_NOT_FOUND' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /api/people
router.post('/', async (req, res, next) => {
  try {
    const { full_name, email } = req.body;
    
    // Validation
    if (!full_name || !email) {
      return res.status(400).json({ error: 'MISSING_FIELDS' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'INVALID_EMAIL_FORMAT' });
    }

    const { rows } = await db.query(
      'INSERT INTO people (full_name, email) VALUES ($1, $2) RETURNING *',
      [full_name, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Postgres unique violation
      return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
    }
    next(err);
  }
});

// PUT /api/people/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, email } = req.body;

    // Validation
    if (!full_name || !email) {
      return res.status(400).json({ error: 'MISSING_FIELDS' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'INVALID_EMAIL_FORMAT' });
    }

    const { rows } = await db.query(
      'UPDATE people SET full_name = $1, email = $2 WHERE id = $3 RETURNING *',
      [full_name, email, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'PERSON_NOT_FOUND' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Postgres unique violation
      return res.status(409).json({ error: 'EMAIL_ALREADY_EXISTS' });
    }
    next(err);
  }
});

// DELETE /api/people/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM people WHERE id = $1', [id]);
    
    if (rowCount === 0) {
      return res.status(404).json({ error: 'PERSON_NOT_FOUND' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
