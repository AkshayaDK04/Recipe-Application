import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      console.log(formData.email);
      console.log(formData.password);
      const data = await response.json();

      
      if (response.ok) {
        console.log("User Logged In Successfully:", data);
        alert("Login successful!");
  
        // Store user details in localStorage
        localStorage.setItem('user', JSON.stringify(data));
  
        // Redirect to home page or profile page
        window.location.href = "/profile";
      } else {
        console.error("Login Failed:", data.message);
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <p>Welcome back! Please log in to continue.</p>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
    </div>
  );
}

export default Login;