const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/home', homeController.getMessages);
router.post('/updateStatus', homeController.updateEmailStatus);

module.exports = router;
