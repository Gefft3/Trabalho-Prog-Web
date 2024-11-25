const pool = require('../db');

const sendEmail = async (req, res) => {

    try {
        const { subject, content, sendDate, status, senderEmail, recipientEmail } = req.body;
        alert( subject, content, sendDate, status, senderEmail, recipientEmail );
        // Verifica se todos os campos obrigatórios foram fornecidos
        if (!subject || !content || !sendDate || !status || !senderEmail || !recipientEmail) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Verificando se o remetente existe no banco
        const senderQuery = await pool.query('SELECT id FROM users WHERE email = $1', [senderEmail]);
        if (senderQuery.rowCount === 0) {
            return res.status(404).json({ message: 'Remetente não encontrado.' });
        }
        //const senderId = senderQuery.rows[0].id;

        // Verificando se o destinatário existe no banco
        const recipientQuery = await pool.query('SELECT id FROM users WHERE email = $1', [recipientEmail]);
        if (recipientQuery.rowCount === 0) {
            return res.status(404).json({ message: 'Destinatário não encontrado.' });
        }
        //const recipientId = recipientQuery.rows[0].id;

        // Inserindo o e-mail no banco de dados
        const result = await pool.query(
            `INSERT INTO message (subject, content, send_date, status, sender_email, recipient_email)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [subject, content, sendDate, status, senderEmail, recipientEmail]
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

module.exports = { sendEmail };
