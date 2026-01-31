const express = require('express');
const router = express.Router();
const { submitSolution } = require('../controllers/submitController');

router.post('/', submitSolution);

module.exports = router;