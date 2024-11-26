const express = require('express');
const router = express.Router();
const sendController = require('../controllers/sendController');
const authenticateToken = require('../middlewares/authMiddleware');

// Rota para enviar e-mail
router.post('/send', authenticateToken, sendController.sendEmail);
router.get('/messages', authenticateToken, sendController.getMessages);

module.exports = router;
