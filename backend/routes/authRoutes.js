const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authControllers');
const authenticate = require('../middlewares/authenticate');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout);

module.exports = router;
