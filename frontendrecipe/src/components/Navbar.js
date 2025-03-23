import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">🍽 RecipeApp</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/add-recipe">Add Recipe</Link></li>
        {user ? (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button className="btn btn-login" onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link className="btn btn-login" to="/login">Login</Link></li>
            <li><Link className="btn btn-register" to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
