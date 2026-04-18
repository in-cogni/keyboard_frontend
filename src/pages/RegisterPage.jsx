import { useState } from 'react';
import '../styles/RegisterPage.css';

function RegisterPage({ onNavigate, onRegister }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!login.trim()) {
      setError('Введите логин');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    if (password !== passwordRepeat) {
      setError('Пароли не совпадают');
      return;
    }
    
    const user = { login: login.trim() };
    localStorage.setItem('user', JSON.stringify(user));
    onRegister(user);
    onNavigate('welcome');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Регистрация</h1>
        
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
          
          <div className="input-group">
            <label>Повторите пароль:</label>
            <input
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              placeholder="Повторите пароль"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="register-submit-btn">Продолжить</button>
        </form>
        
        <button className="register-back-btn" onClick={() => onNavigate('login')}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;