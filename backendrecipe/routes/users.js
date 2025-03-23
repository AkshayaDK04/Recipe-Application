const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegistration,validateLogin } = require('../middleware/authMiddleware');

// User registration route
router.post('/register', validateRegistration, userController.registerUser);
router.post('/login', validateLogin, userController.loginUser);

module.exports = router;