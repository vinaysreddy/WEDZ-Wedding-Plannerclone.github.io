const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/userController');

router.post('/signup', signup);

// Other routes (login, profile, etc.) go here

module.exports = router;
