import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import backgroundImage from '../../assests/images/background.avif';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Add state for cookie consent
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  // Handle cookie consent
  const handleAcceptCookies = () => {
    setShowCookieConsent(false);
    // You can also store this preference in localStorage
    localStorage.setItem('cookieConsent', 'accepted');
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="auth-card">
        {/* Simple Cookie Notice */}
        {showCookieConsent && (
          <div className="simple-cookie">
            <div className="cookie-text">
              <span className="cookie-icon">🍪</span>
              This website uses cookies to ensure you get the best experience.
            </div>
            <button onClick={handleAcceptCookies} className="accept-btn">
              Accept
            </button>
          </div>
        )}
        
        <div className="auth-header">
          <div className="garden-icon">🌱</div>
          <h2>Virtual Garden</h2>
          <p>Welcome back to your garden!</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Enter Garden
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Don't have a garden yet?
            <button onClick={() => navigate('/signup')} className="switch-button">
              Create Garden
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;