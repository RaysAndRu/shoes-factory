import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Auth.css';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); 

    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/login?login=${login}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('authToken', token);
        navigate('/');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage); // Устанавливаем ошибку в состояние
      }
    } catch (error) {
      setError('Произошла ошибка при попытке войти. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <div className="input-group">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>} {/* Вывод ошибки */}
        <button type="submit" className="submit-btn">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
