const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/home', authenticateToken, homeController.getMessages);
router.post('/updateStatus', authenticateToken, homeController.updateEmailStatus);
router.post('/deleteEmail', authenticateToken, homeController.deleteEmail);

module.exports = router;
