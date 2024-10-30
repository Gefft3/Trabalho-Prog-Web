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

const login = async (req, res) => {
    const { email, password } = req.body;
    
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
    );

    if (result.rows.length === 0) {
        res.status(401).json({ message: 'Email or password incorrect' });
    } else {
        res.json(result.rows[0]);
    }
}

module.exports = { getUsers, createUser, login };
