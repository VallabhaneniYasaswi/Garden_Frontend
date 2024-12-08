import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/profile" className="nav-link">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 