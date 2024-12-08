import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🌱</span>
        <span className="navbar-title">Virtual Garden</span>
      </div>
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link 
          to="/garden-planner" 
          className={isActive('/garden-planner') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Garden Planner
        </Link>
        <Link 
          to="/plant-tracker" 
          className={isActive('/plant-tracker') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Plant Tracker
        </Link>
        <Link 
          to="/community" 
          className={isActive('/community') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Community
        </Link>
        <Link 
          to="/garden-tips" 
          className={isActive('/garden-tips') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Garden Tips
        </Link>
        <Link 
          to="/chatbot" 
          className={isActive('/chatbot') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Garden Assistant
        </Link>
        <Link 
          to="/profile" 
          className={isActive('/profile') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Profile
        </Link>
        <Link 
          to="/terrace-farming" 
          className={isActive('/terrace-farming') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Terrace Farming
        </Link>
        <Link 
          to="/weather" 
          className={isActive('/weather') ? 'active' : ''}
          onClick={() => setIsMenuOpen(false)}
        >
          Weather
        </Link>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 