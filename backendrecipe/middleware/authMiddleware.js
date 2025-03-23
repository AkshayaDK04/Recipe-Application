const jwt = require('jsonwebtoken');
const config = require('../config');
// Validate user registration data
exports.validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
  
    // Check if all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
  
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
  
    next();
  };
  
  // Additional middleware functions can be added here
  exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
  
    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
  
    next();
  };
  
  // Authenticate token middleware
  exports.authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');
  
    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwtSecret);
      
      // Add user ID to request
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };