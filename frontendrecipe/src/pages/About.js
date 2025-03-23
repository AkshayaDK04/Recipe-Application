import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>About Our Recipe App 🍽️</h1>
        <p>Your one-stop destination for discovering and sharing amazing recipes!</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            We aim to bring together food lovers from all around the world to share and explore 
            a diverse collection of homemade recipes. Whether you're a seasoned chef or a beginner, 
            our platform provides the perfect space to discover, create, and enjoy cooking.
          </p>
        </div>

        <div className="about-text">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✨ Easy-to-follow recipes with step-by-step instructions</li>
            <li>🍲 A variety of cuisines from different cultures</li>
            <li>❤️ Save and share your favorite recipes with others</li>
            <li>👨‍🍳 Join a passionate community of home cooks</li>
          </ul>
        </div>

        <div className="about-text">
          <h2>Join Our Community</h2>
          <p>
            Ready to start your cooking journey? Sign up today and become part of a growing 
            community that loves good food and great experiences.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
