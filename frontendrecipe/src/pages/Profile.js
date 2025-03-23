import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import './Profile.css';

const url = '/api/user';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/profile`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.payload);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className='loading-text'>Loading profile... 👤</p>;
  }

  if (!user) {
    return <p className='error-text'>User not found! ❌</p>;
  }

  return (
    <div className='container'>
      <h1 className='mb-4 mt-5'>👤 {user.username}'s Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      
      <h2 className='mt-4'>📌 Created Recipes</h2>
      <div className='recipe-grid'>
        {user.createdRecipes.length > 0 ? (
          user.createdRecipes.map((recipe) => (
            <Card key={recipe._id} className='recipe-tile'>
              <Card.Img variant='top' src={recipe.image || 'default-recipe.jpg'} alt={recipe.Name} className='recipe-img' />
              <Card.Body>
                <Card.Title>{recipe.Name}</Card.Title>
                <Link to={`/recipe/${recipe._id}`} className='btn btn-primary'>View Recipe</Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No recipes created yet.</p>
        )}
      </div>
      
      <h2 className='mt-4'>❤️ Favorite Recipes</h2>
      <div className='recipe-grid'>
        {user.favoriteRecipes.length > 0 ? (
          user.favoriteRecipes.map((recipe) => (
            <Card key={recipe._id} className='recipe-tile'>
              <Card.Img variant='top' src={recipe.image || 'default-recipe.jpg'} alt={recipe.Name} className='recipe-img' />
              <Card.Body>
                <Card.Title>{recipe.Name}</Card.Title>
                <Link to={`/recipe/${recipe._id}`} className='btn btn-primary'>View Recipe</Link>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No favorite recipes yet.</p>
        )}
      </div>
      
      <Link to='/' className='btn btn-secondary mt-3'>Back to Home</Link>
    </div>
  );
}

export default Profile;
