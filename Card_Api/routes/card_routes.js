const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card_controller');

router.post('/cards', cardController.createCard);

module.exports = router;