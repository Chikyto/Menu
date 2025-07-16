// src/pages/Menu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import MenuContainer from '../components/menu/MenuContainer';

const Menu = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <div className="menu-page">
      <Header showAdminLink={true} onAdminClick={handleAdminClick} />
      
      <main className="main-content">
        <div className="container">
          <MenuContainer />
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Prost Restaurant & Bar. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Menu;