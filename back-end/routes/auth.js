const express = require('express');
const router = express.Router();
const { login, register, getUsuarios} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/usuarios', getUsuarios)

module.exports = router;