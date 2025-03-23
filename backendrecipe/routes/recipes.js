/*const express = require('express');
const multer = require('multer');
const { getRecipes, getRecipeById, createRecipe, deleteRecipe } = require('../controllers/recipeController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipeById);

// Protected routes (only authenticated users)
router.post('/', authenticateUser, upload.single('image'), createRecipe); // Accept image upload
router.delete('/:id', authenticateUser, deleteRecipe);

module.exports = router;
*/const express = require('express');
const router = express.Router();
// Comment out the problematic controller import
// const recipeController = require('../controllers/recipeController');

// Comment out or replace the problematic route with a placeholder
// router.post('/some-route', recipeController.someMethod);

// Option 1: Replace with a simple placeholder response
router.post('/some-route', (req, res) => {
  res.status(200).json({ message: 'Recipe route temporarily disabled' });
});

// Option 2: Comment out all routes
/*
router.get('/your-other-routes', ...);
router.post('/another-route', ...);
*/

module.exports = router;