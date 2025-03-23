const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegistration } = require('../middleware/authMiddleware');

// User registration route
router.post('/register', validateRegistration, userController.registerUser);

module.exports = router;