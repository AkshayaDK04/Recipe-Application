const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
    try {
        // Get the token from headers
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = await User.findById(decoded.id).select('-password'); // Attach user data to request

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        next(); // Proceed to next function
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = { authenticateUser };
