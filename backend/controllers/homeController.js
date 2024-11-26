const pool = require('../db');

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
};

// Função para atualizar o status do e-mail
const updateEmailStatus = async (req, res) => {
  const { emailId, newStatus } = req.body;

  if (!emailId || !newStatus) {
    return res.status(400).json({ message: 'Faltam parâmetros.' });
  }

  try {
    const result = await pool.query(
      'UPDATE messages SET status = $1 WHERE id = $2 RETURNING *',
      [newStatus, emailId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'E-mail não encontrado.' });
    }

    res.status(200).json({ message: 'Status do e-mail atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar o status do e-mail:', error);
    res.status(500).json({ message: 'Erro ao atualizar o status.' });
  }
};

// Função para deletar o e-mail
const deleteEmail = async (req, res) => {
  const { emailId } = req.body;

  if (!emailId) {
    return res.status(400).json({ message: 'ID do e-mail é necessário.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM messages WHERE id = $1 RETURNING *',
      [emailId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'E-mail não encontrado.' });
    }

    res.status(200).json({ message: 'E-mail deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar o e-mail:', error);
    res.status(500).json({ message: 'Erro ao deletar o e-mail.' });
  }
};

module.exports = { getMessages, updateEmailStatus, deleteEmail };
