import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import backgroundImage from '../../assests/images/background.avif';

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    onSignup();
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="auth-card">
        <div className="auth-header">
          <div className="garden-icon">🪴</div>
          <h2>Virtual Garden</h2>
          <p>Create your garden today!</p>
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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create Garden
          </button>
        </form>

        <div className="auth-switch">
          <p>
            Already have a garden?
            <button onClick={() => navigate('/login')} className="switch-button">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup; 