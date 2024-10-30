const pool = require('../db');

const getUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
    res.json(result.rows[0]);
};

module.exports = { getUsers, createUser };
