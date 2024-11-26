const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];  // Recebe o token do cabeçalho da requisição

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Por favor, faça login.' }); // Se não houver token, retorna erro
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' }); // Se o token for inválido, retorna erro
    }

    req.user = user;  
    next();  
  });
};

module.exports = authenticateToken;
