const jwt = require('jsonwebtoken');
const config = require('../config');

// Generate JWT token
exports.generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    config.jwtSecret,
    { expiresIn: '24h' }
  );
};

// Additional helper functions can be added here