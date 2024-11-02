const pool = require('../db');

const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar usuário.' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Validação simples
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário deletado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar usuário.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, login };
