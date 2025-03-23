import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './RecipeDetail.css';
import { FaHeart, FaEdit, FaTrash } from 'react-icons/fa';
import foodImage3 from '../assets/food3.jpg';

const url = 'http://localhost:4000/api/recipes';


function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data.payload);
        setLoading(false);
      })
      .catch(() => {
        setRecipe(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className='loading-text'>Loading recipe details... 🍳</p>;
  if (!recipe) return <p className='error-text'>Recipe not found! ❌</p>;

  // Ensure correct image path
  const imageUrl = recipe.image ? `/uploads/${recipe.image}` : foodImage3;

  return (
    <div className='container'>
      <Card className="recipe-detail-card">
        <Card.Img variant="top" src={imageUrl} alt={recipe.name} className="recipe-detail-img" />
        <Card.Body>
          <Card.Title className="recipe-detail-title">{recipe.name}</Card.Title>
          <p><strong>Author:</strong> {recipe.author}</p>
          <p><strong>Rating:</strong> ⭐ {recipe.rating}</p>
          <p><strong>Time:</strong> ⏳ {recipe.maxTime} mins</p>
          <p><strong>Description:</strong> {recipe.description}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Steps:</strong> {recipe.steps}</p>
          <div className="button-group">
            <Button variant="outline-warning">
              <FaHeart /> Favorite
            </Button>
            <Link to={`/save/${recipe._id}`} className="btn btn-outline-primary">
              <FaEdit /> Edit
            </Link>
            <Button variant="outline-danger">
              <FaTrash /> Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Link to="/recipes" className="btn btn-secondary mt-3">Back to Recipes</Link>
    </div>
  );
}


export default RecipeDetail;
