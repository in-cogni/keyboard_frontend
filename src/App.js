import { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import TextSelectionPage from './pages/TextSelectionPage';
import TimeSelectionPage from './pages/TimeSelectionPage';
import TypingPage from './pages/TypingPage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { generateString, symbolsForNeed } from './services/textUtils';
import { generateLevelText } from './services/levels';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [textConfig, setTextConfig] = useState({ type: 'random', data: '' });
  const [timeLimit, setTimeLimit] = useState(30);
  const [gameResult, setGameResult] = useState(null);
  const [user, setUser] = useState(null);

  // Загрузка пользователя из localStorage при старте
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const goToPage = (page) => setCurrentPage(page);

  const getTextForTyping = (config) => {
    if (config.type === 'random') {
      return generateString(symbolsForNeed, 100);
    }
    
    if (config.type === 'levels') {
      const levelName = config.data.replace('__LEVEL__:', '');
      return generateLevelText(levelName, 100);
    }
    
    if (config.type === 'database') {
      const textName = config.data.replace('__DB__:', '');
      const dbTexts = {
        'Текст 1': 'Это первый тестовый текст для тренировки печати. Постарайтесь напечатать его без ошибок.',
        'Текст 2': 'Второй текст немного сложнее. Здесь есть знаки препинания, цифры 123 и специальные символы!',
        'Текст 3': 'Третий текст - классика: The quick brown fox jumps over the lazy dog. Смесь английского и русского.',
      };
      return dbTexts[textName] || dbTexts['Текст 1'];
    }
    
    if (config.type === 'computer') {
      return config.data;
    }
    
    return generateString(symbolsForNeed, 100);
  };

  if (currentPage === 'welcome') {
    return <WelcomePage onNavigate={goToPage} user={user} />;
  }
  
  if (currentPage === 'login') {
    return <LoginPage onNavigate={goToPage} onLogin={setUser} />;
  }
  
  if (currentPage === 'register') {
    return <RegisterPage onNavigate={goToPage} onRegister={setUser} />;
  }
  
  if (currentPage === 'text-selection') {
    return <TextSelectionPage onNavigate={goToPage} onTextTypeSelect={setTextConfig} />;
  }
  
  if (currentPage === 'time') {
    return <TimeSelectionPage onNavigate={goToPage} onTimeSelect={setTimeLimit} />;
  }
  
  if (currentPage === 'typing') {
    const text = getTextForTyping(textConfig);
    return <TypingPage 
      textConfig={textConfig}
      timeLimit={timeLimit} 
      generatedText={text}
      onNavigate={goToPage} 
      onGameFinish={setGameResult} 
    />;
  }
  
  if (currentPage === 'result' && gameResult) {
    return (
      <ResultPage 
        result={gameResult}
        onRestart={() => {
          setGameResult(null);
          goToPage('typing');
        }}
        onExit={() => {
          setGameResult(null);
          goToPage('welcome');
        }}
      />
    );
  }
  
  return <div>404</div>;
}

export default App;