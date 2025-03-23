import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../assets/hero-image.jpg';
import foodImage1 from '../assets/food1.jpg';
import foodImage2 from '../assets/food2.jpg';
import foodImage3 from '../assets/food3.jpg';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <img src={heroImage} alt="Delicious Food" className="hero-image" />
        <div className="hero-text">
          <h1>Discover the Joy of Cooking! 🍽️</h1>
          <p>Find, share, and enjoy the best homemade recipes from around the world.</p>
          <Link to="/recipes" className="btn btn-primary">Explore Recipes</Link>
        </div>
      </section>
      
      <section className="featured-recipes">
        <h2>Featured Recipes</h2>
        <div className="recipe-gallery">
          <div className="recipe-card">
            <img src={foodImage1} alt="Dish 1" />
            <p>Spicy Italian Pasta</p>
          </div>
          <div className="recipe-card">
            <img src={foodImage2} alt="Dish 2" />
            <p>Homemade Sushi Rolls</p>
          </div>
          <div className="recipe-card">
            <img src={foodImage3} alt="Dish 3" />
            <p>Classic French Croissants</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join Our Cooking Community! 🧑‍🍳</h2>
        <p>Sign up now and start creating your own delicious recipes.</p>
        <Link to="/register" className="btn btn-secondary">Get Started</Link>
      </section>
    </div>
  );
}

export default Home;
