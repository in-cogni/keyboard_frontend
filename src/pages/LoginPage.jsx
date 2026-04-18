import { useState } from 'react';
import '../styles/LoginPage.css';

function LoginPage({ onNavigate, onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!login.trim()) {
      setError('Введите логин');
      return;
    }
    if (!password.trim()) {
      setError('Введите пароль');
      return;
    }
    
    const user = { login: login.trim() };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    onNavigate('welcome');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Вход</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Логин:</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
            />
          </div>
          
          <div className="input-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-submit-btn">Продолжить</button>
        </form>
        
        <div className="register-link">
          <span>Новый пользователь? </span>
          <button onClick={() => onNavigate('register')}>
            Зарегистрироваться
          </button>
        </div>
        
        <button className="login-back-btn" onClick={() => onNavigate('welcome')}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default LoginPage;