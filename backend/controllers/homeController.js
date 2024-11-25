const pool = require('../db'); // Supondo que você está usando PostgreSQL

const getMessages = async (req, res) => {

    const userEmail = req.user.email;

    alert(userEmail);

    try {
        // Busca todos os e-mails que têm o 'recipient_email' igual ao e-mail do usuário logado
        const result = await pool.query(
            'SELECT * FROM emails WHERE recipient_email = $1 ORDER BY send_date DESC',
            [userEmail] // Passando o e-mail do usuário como parâmetro
        );

        // Caso não haja e-mails encontrados
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum e-mail encontrado.' });
        }

        res.json(result.rows); // Retorna os e-mails encontrados

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar os e-mails.' });
    }
};

module.exports = { getMessages };
