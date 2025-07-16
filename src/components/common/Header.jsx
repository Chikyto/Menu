// src/components/common/Header.jsx
import React from 'react';

const Header = ({ showAdminLink = false, onAdminClick }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="brand">
            <h1 className="logo">🍺 PROST</h1>
            <p className="tagline">Restaurant & Bar</p>
          </div>
          
          {showAdminLink && (
            <button 
              className="admin-btn"
              onClick={onAdminClick}
            >
              Administración
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;