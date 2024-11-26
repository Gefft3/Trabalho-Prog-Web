const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtém o cabeçalho Authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido. Por favor, faça login.' });
  }

  // Extrai o token do formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Por favor, faça login.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Erro na validação do token:', err); // Log de erro para debugging
      return res.status(403).json({ message: 'Token inválido.' });
    }

    req.user = user; // Armazena os dados do usuário no request para uso posterior
    next(); // Continua para o próximo middleware ou rota
  });
};

module.exports = authenticateToken;
