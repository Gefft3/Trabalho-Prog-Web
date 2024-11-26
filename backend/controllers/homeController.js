const pool = require('../db');

const getMessages = async (req, res) => {

  const email = req.query.email; // Usa query string para pegar o e-mail da URL do método GET

  try {
    console.log('Buscando e-mails para o usuário:', email);
    // Busca todos os e-mails que têm o 'recipient_email' igual ao e-mail do usuário logado
    const result = await pool.query(
      'SELECT * FROM messages WHERE recipient_email = $1 ORDER BY status DESC',
      [email] // Passando o e-mail do usuário como parâmetro
    );

    console.log('Registros encontrados:', result.rows);

    if (result.rows.length === 0) {
      console.log('Nenhum e-mail encontrado para:', email);
      return res.status(200).json({ message: 'Sua caixa de entrada está atualizada.' });
    }

    res.json(result.rows);  // Retorna os e-mails encontrados

  } catch (error) {
    console.error('Erro ao buscar o email:', error);
    res.status(500).json({ message: 'Erro ao buscar os e-mails.' });
  }
};

// Função para atualizar o status do e-mail
const updateEmailStatus = async (req, res) => {

  const { emailId, newStatus } = req.body; // Recebe o ID do e-mail e o novo status do corpo da requisição

  // Verifica se os parâmetros foram fornecidos
  if (!emailId || !newStatus) {
    return res.status(400).json({ message: 'Falta parâmetros' });
  }

  try {

    console.log(`Atualizando o status do e-mail com ID: ${emailId} para: ${newStatus}`);

    const result = await pool.query(
      'UPDATE messages SET status = $1 WHERE id = $2 RETURNING *',
      [newStatus, emailId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'E-mail não encontrado.' });
    }

    console.log('E-mail atualizado:', result.rows[0]);
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
