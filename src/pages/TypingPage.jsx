import { useEffect } from 'react';
import { useTypingGame } from '../hooks/useTypingGame';
import Keyboard from '../components/Keyboard';

function TypingPage({ timeLimit, generatedText, onNavigate, onGameFinish }) {
  const {
    text1, text2, timeLeft, rightKeys, wrongKeys,
    currentChar, highlightKey, greenFlash, redFlash, handleKeyPress
  } = useTypingGame(timeLimit, generatedText, (result) => {
    onGameFinish(result);
    onNavigate('result');
  });
  
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'F5' && e.key !== 'F12') {
        e.preventDefault();
      }
      handleKeyPress(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyPress]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const FIXED_WIDTH = 15;
  
  let leftDisplay = text1.slice(-FIXED_WIDTH);
  if (text1.length < FIXED_WIDTH) {
    leftDisplay = leftDisplay.padStart(FIXED_WIDTH, ' ');
  }
  
  const rightTextWithoutCurrent = text2.slice(1);
  let rightDisplay = rightTextWithoutCurrent.slice(0, FIXED_WIDTH);
  if (rightDisplay.length < FIXED_WIDTH) {
    rightDisplay = rightDisplay.padEnd(FIXED_WIDTH, ' ');
  }
  
  return (
    <div style={{ padding: 20, fontFamily: 'monospace', textAlign: 'center' }}>
      <div style={{ fontSize: 28, marginBottom: 20, color: '#7730CE' }}>
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      
      <div style={{
        fontSize: 28, marginBottom: 30, background: '#E8E0F0', padding: '20px 40px', borderRadius: 10,
        fontFamily: 'monospace', whiteSpace: 'pre', display: 'flex', justifyContent: 'center',
        alignItems: 'center', minHeight: 100
      }}>
        <div style={{
          textAlign: 'right', 
          color: '#4CAF50', 
          width: `${FIXED_WIDTH}ch`,
          fontFamily: 'monospace',
          letterSpacing: 'normal'
        }}>
          {leftDisplay}
        </div>
        
        <div style={{
          backgroundColor: '#7730CE', 
          color: 'white', 
          padding: '4px 12px', 
          borderRadius: 6,
          margin: '0 4px', 
          minWidth: 40, 
          textAlign: 'center', 
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          {currentChar || ' '}
        </div>
        
        <div style={{
          textAlign: 'left', 
          color: '#999', 
          width: `${FIXED_WIDTH}ch`,
          fontFamily: 'monospace',
          letterSpacing: 'normal'
        }}>
          {rightDisplay}
        </div>
      </div>
      
      <Keyboard 
        highlightKey={highlightKey}
        greenFlashKey={greenFlash}
        redFlashKey={redFlash}
      />
      
      <div style={{ marginTop: 20, fontSize: 18 }}>
        Правильных: {rightKeys} | Ошибок: {wrongKeys}
      </div>
    </div>
  );
}

export default TypingPage;