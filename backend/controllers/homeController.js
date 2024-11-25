const pool = require('../db');

const getMessages = async (req, res) => {

    const email = req.query.email;  // Usando query string para pegar o e-mail

    alert(email);

    // Validação simples
    if (!email) {
        return res.status(400).json({ message: 'EMAIL VAZIO' });
    }

    try {

        console.log('Buscando e-mails para o usuário:', email);  // Adicione o log aqui
        // Busca todos os e-mails que têm o 'recipient_email' igual ao e-mail do usuário logado
        const result = await pool.query(
            'SELECT * FROM messages WHERE recipient_email = $1 ORDER BY send_date DESC',
            [email] // Passando o e-mail do usuário como parâmetro
        );

        // Caso não haja e-mails encontrados
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum e-mail encontrado.' });
        }

        res.json(result.rows); // Retorna os e-mails encontrados

    } catch (error) {
        console.error('Erro ao buscar o email:',error);
        res.status(500).json({ message: 'Erro ao buscar os e-mails.' });
    }
};

module.exports = {getMessages};
