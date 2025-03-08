import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="home" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)',
      color: '#4527A0',
      fontFamily: 'Roboto, sans-serif',
    }}>

      <header className="app-header" style={{ marginBottom: '20px' }}>
        <Header />
      </header>

      <main className="home-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <h1 className='home-text' style={{
          fontSize: '3em',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex', // Добавляем flex для выравнивания иконки
          alignItems: 'center', // Выравниваем иконку по вертикали
          justifyContent: 'center', // Выравниваем текст по центру
        }}>
          Добро пожаловать в систему управления обувной фабрикой
        </h1>

        <p style={{
          fontSize: '1.2em',
          textAlign: 'center',
          maxWidth: '700px',
          marginBottom: '30px',
        }}>
          Здесь вы можете эффективно управлять всеми этапами производства обуви: от закупки материалов до отгрузки готовой продукции.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
        }}>
          <Link to="/products" style={buttonStyle('#7E57C2', '#673AB7')}>
            Управление продукцией
          </Link>
          <Link to="/production-orders" style={buttonStyle('#5C6BC0', '#3F51B5')}>
            Управление производственными заказамм
          </Link>
        </div>
      </main>

      <footer className="app-footer" style={{
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginTop: 'auto',
      }}>
        &copy; 2024 Система управления обувной фабрикой
      </footer>
    </div>
  );
};

// Функция для создания стилей кнопок
const buttonStyle = (bgColor, hoverColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  padding: '15px 30px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '1.1em',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: hoverColor,
  }
});

export default HomePage;
