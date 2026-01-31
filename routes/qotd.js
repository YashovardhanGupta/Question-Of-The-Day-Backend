const express = require('express');
const router = express.Router();
const { getTodayQuestion } = require('../controllers/qotdController');

router.get('/', getTodayQuestion);

module.exports = router;