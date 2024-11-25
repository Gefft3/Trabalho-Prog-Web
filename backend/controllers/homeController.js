const pool = require('../db');

const getMessages = async (req, res) => {
    try {
        const message = await pool.query('SELECT * FROM message ORDER BY send_date DESC');
        res.json(message.rows);
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        res.status(500).json({ message: 'Erro ao buscar mensagens.' });
    }
};

module.exports = { getMessages };

const pool = require('../db'); // Supondo que você está usando PostgreSQL

const getEmails = async (req, res) => {
    try {
        // Aqui, você pode buscar os e-mails de um usuário baseado em um critério, como o ID do usuário no banco
        // Aqui, vamos apenas pegar todos os e-mails, mas você pode ajustar para filtrar por um usuário específico
        const result = await pool.query('SELECT * FROM emails ORDER BY send_date DESC');

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum e-mail encontrado.' });
        }

        res.json(result.rows); // Retorna os e-mails encontrados
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os e-mails.' });
    }
};

module.exports = { getEmails };
