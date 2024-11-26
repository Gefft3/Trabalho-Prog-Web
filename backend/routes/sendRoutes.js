const express = require('express');
const router = express.Router();
const sendController = require('../controllers/sendController');

// Rota para enviar e-mail
router.post('/send', sendController.sendEmail);

module.exports = router;
