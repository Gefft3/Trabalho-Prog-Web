const pool = require('../db');

const sendEmail = async (req, res) => {
    try {
        // console.log('Requisição recebida na rota /api/send');
        // Obtendo dados da requisição
        const { subject, content, sendDate, status, senderEmail, recipientEmail } = req.body;

        // Verifica se todos os campos obrigatórios foram fornecidos


        if (!subject || !content || !status || !sendDate || !senderEmail || !recipientEmail) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Verifica se o remetente existe no banco
        const senderQuery = await pool.query('SELECT id FROM users WHERE email = $1', [senderEmail]);
        if (senderQuery.rowCount === 0) {
            return res.status(404).json({ message: 'Remetente não encontrado.' });
        }

        // Verifica se o destinatário existe no banco
        const recipientQuery = await pool.query('SELECT id FROM users WHERE email = $1', [recipientEmail]);
        if (recipientQuery.rowCount === 0) {
            return res.status(404).json({ message: 'Destinatário não encontrado.' });
        }

        // Insere o e-mail no banco de dados
        const result = await pool.query(
            `INSERT INTO messages (subject, content, status, send_date, sender_email, recipient_email)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [subject, content, status, sendDate, senderEmail, recipientEmail]
        );

        // Respondendo com o e-mail salvo no banco
        res.status(201).json({
            message: 'E-mail enviado com sucesso!',
            email: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail.' });
    }
};

const getMessages = async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: 'O e-mail é necessário.' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM messages WHERE recipient_email = $1 ORDER BY status DESC',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({ message: 'Sua caixa de entrada está atualizada.' });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar os e-mails:', error);
        res.status(500).json({ message: 'Erro ao buscar os e-mails.' });
    }
}

module.exports = { sendEmail, getMessages };
