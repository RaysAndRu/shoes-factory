// src/pages/AccessDenied.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>У вас нет доступа к этой странице.</h1>
      <button onClick={handleGoHome}>Вернуться на главную</button>
    </div>
  );
};

export default AccessDenied;
