import bgImage from '../assets/bg.jpg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import './AddRecipe.css';

const url = 'http://localhost:4000/api/recipes';

const styles = {
  background: `url(${bgImage}) no-repeat center center/cover`
};

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: '', image: '', description: '', ingredients: '', steps: '', maxTime: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must log in first! Redirecting to login page...');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImageFile(e.target.files[0]);
    } else {
      setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Unauthorized! Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("description", recipe.description);
    formData.append("ingredients", recipe.ingredients);
    formData.append("steps", recipe.steps);
    formData.append("maxTime", recipe.maxTime);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) navigate('/profile');
      else setError('Failed to add recipe');
    } catch (error) {
      setError('Something went wrong. Try again!');
    }
  };

  return (
    <div className="add-recipe-wrapper" style={styles}>
      <Card className="add-recipe-card">
        <Card.Body>
          <h2 className="title">➕ Add a New Recipe</h2>
          {error && <p className="error-text">{error}</p>}
          <Form onSubmit={handleSubmit} className="recipe-form">
            <Form.Group controlId="name">
              <Form.Control type="text" name="name" placeholder="Recipe Name" value={recipe.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Control as="textarea" rows={3} name="description" placeholder="Description" value={recipe.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="ingredients">
              <Form.Control as="textarea" rows={3} name="ingredients" placeholder="Ingredients" value={recipe.ingredients} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="steps">
              <Form.Control as="textarea" rows={3} name="steps" placeholder="Preparation Steps" value={recipe.steps} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="maxTime">
              <Form.Control type="number" name="maxTime" placeholder="Cooking Time (mins)" value={recipe.maxTime} onChange={handleChange} required />
            </Form.Group>

            <Button className="submit-btn" type="submit">Add Recipe</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddRecipe;
