import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/auth');
  };

  return (
    <header className="app-header" style={{
      background: 'linear-gradient(45deg, #2980B9, #6DD5FA)',
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
    }}>
      <nav>
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
          <li><Link to="/" style={linkStyle}>Главная</Link></li>
          <li><Link to="/clients" style={linkStyle}>Клиенты</Link></li>
          <li><Link to="/client-orders" style={linkStyle}>Заказы</Link></li>
          <li><Link to="/employees" style={linkStyle}>Сотрудники</Link></li>
          <li><Link to="/materials" style={linkStyle}>Материалы</Link></li>
          <li><Link to="/products" style={linkStyle}>Продукты</Link></li>
          <li><Link to="/production-orders" style={linkStyle}>Производство</Link></li>
          <li><Link to="/suppliers" style={linkStyle}>Поставщики</Link></li>
          <li><Link to="/warehouses" style={linkStyle}>Склады</Link></li>
          <li><Link to="/auth" style={linkStyle}>Авторизация</Link></li>
          <li>
            <button onClick={handleLogout} style={buttonStyle}>Выйти</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'color 0.3s ease',
  padding: '0.5rem 1rem',
  borderRadius: '5px',

  '&:hover': {
    color: '#FFDA79',
  }
};

const buttonStyle = {
  background: '#E74C3C',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    background: '#C0392B',
  }
};

export default Header;
