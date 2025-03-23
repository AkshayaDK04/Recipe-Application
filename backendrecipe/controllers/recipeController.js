const Recipe = require('../models/Recipe');

// Fetch all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, payload: recipes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching recipes' });
    }
};

// Fetch a single recipe by ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.status(200).json({ success: true, payload: recipe });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching recipe' });
    }
};

// Create a new recipe
const createRecipe = async (req, res) => {
    try {
      const { name, description, ingredients, steps, maxTime } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : ''; // Store image path
  
      const newRecipe = new Recipe({
        name,
        description,
        ingredients,
        steps,
        maxTime,
        image: imagePath, // Save image URL in the database
      });
  
      await newRecipe.save();
      res.status(201).json({ success: true, message: 'Recipe added successfully!', recipe: newRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error!' });
    }
  };

// Delete a recipe (only by admin or creator)
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        if (req.user.role !== 'admin' && req.user.id !== recipe.createdBy.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this recipe' });
        }

        await recipe.deleteOne();
        res.status(200).json({ success: true, message: 'Recipe deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting recipe' });
    }
};

// Export all functions
module.exports = { getRecipes, getRecipeById, createRecipe, deleteRecipe };
