import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Recipes.css';
import { FaEdit, FaTrash, FaHeart } from 'react-icons/fa';
import DeleteModal from '../components/DeleteModal';
import foodImage3 from '../assets/food3.jpg';

const url = 'http://localhost:4000/api/recipes';


const RecipeTile = ({ recipe, onDeleteClick, onFavoriteClick }) => {
  // Ensure correct image path
  const imageUrl = recipe.image ? `/uploads/${recipe.image}` : foodImage3;

  return (
    <Card className="recipe-tile mb-4 shadow-sm">
      <Card.Img variant="top" src={imageUrl} alt={recipe.name} className="recipe-img" />
      <Card.Body>
        <Card.Title className="recipe-title">{recipe.name}</Card.Title>
        <Card.Text>
          <p><strong>Author:</strong> {recipe.author}</p>
          <p><strong>Rating:</strong> ⭐ {recipe.rating}</p>
          <p><strong>Time:</strong> ⏳ {recipe.maxTime} mins</p>
        </Card.Text>
        <div className="button-group">
          <Link to={`/save/${recipe._id}`} className="btn btn-outline-primary">
            <FaEdit /> Edit
          </Link>
          <Button variant="outline-danger" onClick={() => onDeleteClick(recipe._id)}>
            <FaTrash /> Delete
          </Button>
          <Button variant="outline-warning" onClick={() => onFavoriteClick(recipe._id)}>
            <FaHeart /> Favorite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};


function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecipes = () => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.payload);
        setLoading(false);
      })
      .catch(() => {
        setRecipes([]);
        setLoading(false);
      });
  };

  const searchRecipeByName = () => {
    fetch(`${url}/search/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data.payload))
      .catch(() => setRecipes([]));
  };

  const deleteRecipe = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchRecipes();
        setShowDeleteModal(false);
      })
      .catch(() => {});
  };

  const addFavoriteRecipe = (id) => {
    console.log(`Recipe ${id} added to favorites!`);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-4 mt-5'>🍽️ Delicious Recipes</h1>
        <Link to='/save'>
          <Button variant='success'>➕ Add New Recipe</Button>
        </Link>
      </div>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search recipe by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={searchRecipeByName}>Search</Button>
      </div>

      {loading ? (
        <p className='loading-text'>Loading recipes... 🍳</p>
      ) : (
        <div className="recipe-grid">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeTile key={recipe._id} recipe={recipe} onDeleteClick={deleteRecipe} onFavoriteClick={addFavoriteRecipe} />
            ))
          ) : (
            <p className="no-recipes">No such recipe found. Please recheck! ❌</p>
          )}
        </div>
      )}

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        {...selectedRecipe}
        deleteRecipe={() => deleteRecipe(selectedRecipe._id)}
      />
    </div>
  );
}

export default Recipe;