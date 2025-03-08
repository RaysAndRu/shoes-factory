import React from 'react';
import LoginForm from '../components/LoginForm';
import '../assets/css/Auth.css';

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-info">
          <h2>Добро пожаловать в систему управления обувной фабрики</h2>
          <p>
            Для доступа к рабочим данным и внутренним ресурсам, пожалуйста, выполните вход.
            Система предназначена только для сотрудников фабрики.
          </p>
          <div className="auth-rules">
            <h3>Правила использования:</h3>
            <ul>
              <li>Система доступна только авторизованным сотрудникам.</li>
              <li>Ваша учетная запись защищена и используется исключительно для рабочих целей.</li>
              <li>Для доступа к закрытым данным требуется соответствующий уровень доступа.</li>
            </ul>
          </div>
        </div>
        <div className="auth-forms">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
