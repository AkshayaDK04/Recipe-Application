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