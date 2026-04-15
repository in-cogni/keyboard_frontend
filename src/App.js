import { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import TextSelectionPage from './pages/TextSelectionPage';
import TimeSelectionPage from './pages/TimeSelectionPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [textType, setTextType] = useState('random');
  const [timeLimit, setTimeLimit] =useState(30);
  const goToPage = (page) => setCurrentPage(page);

  if(currentPage === 'welcome'){
    return <WelcomePage onNavigate={goToPage} />;
  }
  if(currentPage === 'text-selection'){
    return (
      <TextSelectionPage
        onNavigate={goToPage}
        onTextTypeSelect={setTextType}
      />
    );
  }
  if(currentPage === 'time'){
    return (
      <TimeSelectionPage
        onNavigate={goToPage}
        onTimeTypeSelect={setTimeLimit}
      />
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Keyboard</h2>
      <button onClick={() => goToPage('welcome')}>back</button>
    </div>
  );
}

export default App;