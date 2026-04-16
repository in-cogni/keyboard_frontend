import { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import TextSelectionPage from './pages/TextSelectionPage';
import TimeSelectionPage from './pages/TimeSelectionPage';
import TypingPage from './pages/TypingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [textType, setTextType] = useState('random');
  const [timeLimit, setTimeLimit] = useState(30);
  const [gameResult, setGameResult] = useState(null);

  const goToPage = (page) => setCurrentPage(page);

  if (currentPage === 'welcome') {
    return <WelcomePage onNavigate={goToPage} />;
  }
  if (currentPage === 'text-selection') {
    return <TextSelectionPage onNavigate={goToPage} onTextTypeSelect={setTextType} />;
  }
  if (currentPage === 'time') {
    return <TimeSelectionPage onNavigate={goToPage} onTimeSelect={setTimeLimit} />;
  }
if (currentPage === 'typing') {
  const demoText = "Привет мир это тестовый текст для печати";
  return <TypingPage 
    textType={textType} 
    timeLimit={timeLimit} 
    generatedText={demoText}
    onNavigate={goToPage} 
    onGameFinish={setGameResult} 
  />;
}
  if (currentPage === 'result') {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Результаты</h1>
        {gameResult && (
          <div>
            <p>Скорость: {gameResult.wpm} WPM</p>
            <p>Точность: {gameResult.accuracy}%</p>
            <p>Ошибки: {gameResult.mistakes}</p>
          </div>
        )}
        <button onClick={() => goToPage('welcome')}>На главную</button>
        <button onClick={() => goToPage('typing')}>Ещё раз</button>
      </div>
    );
  }
  return <div>404</div>;
}

export default App;