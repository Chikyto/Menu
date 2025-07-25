// src/components/common/Loading.jsx
import React from 'react';

const Loading = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;