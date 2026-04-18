import '../styles/WelcomePage.css';

function WelcomePage({ onNavigate, user }) {
  return (
    <div className='welcome-container'>
      {user && (
        <div className='user-info'>
          <div>Имя: {user.login}</div>
          <div>Рекорд: {user.maxRecord ? `${user.maxRecord.toFixed(2)} ms` : 'нет'}</div>
        </div>
      )}
      
      <button
        className='welcome-login-btn'
        onClick={() => onNavigate('login')}
      >
        {user ? 'Профиль' : 'Войти'}
      </button>
      
      <h1 className='title'>Клавиатурный тренажёр</h1>
      
      <button
        className='start-btn'
        onClick={() => onNavigate('text-selection')}
      >
        Начать!
      </button>
    </div>
  );
}

export default WelcomePage;