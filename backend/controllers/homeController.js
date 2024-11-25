const pool = require('../db');

const getMessages = async (req, res) => {

    const email = req.query.email;  // Usa query string para pegar o e-mail da URL do método GET

    try {

        console.log('Buscando e-mails para o usuário:', email);  
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

// Função para atualizar o status do e-mail
const updateEmailStatus = async (req, res) => {

    const { emailId, newStatus } = req.body; // Recebe o ID do e-mail e o novo status do corpo da requisição
  
    // Verifica se os parâmetros foram fornecidos
    if (!emailId || !newStatus) {
      return res.status(400).json({ message: 'Falta parâmetros' });
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

module.exports = {getMessages, updateEmailStatus};
