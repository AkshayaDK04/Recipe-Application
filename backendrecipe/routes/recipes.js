const express = require('express');
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
