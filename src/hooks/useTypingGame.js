import { useState, useEffect, useRef, useCallback } from 'react';

export const useTypingGame = (timeLimitSeconds, fullText, onGameEnd) => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState(fullText || '');
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [isActive, setIsActive] = useState(true);
  const [rightKeys, setRightKeys] = useState(0);
  const [wrongKeys, setWrongKeys] = useState(0);
  const [currentChar, setCurrentChar] = useState(fullText?.[0] || '');
  const [highlightKey, setHighlightKey] = useState(null);
  const [greenFlash, setGreenFlash] = useState(null);
  const [redFlash, setRedFlash] = useState(null);
  
  const timerRef = useRef(null);
  const clickAllTimeRef = useRef(0);
  const stopwatchStartRef = useRef(null);
  const rightKeysRef = useRef(0);
  const text1Ref = useRef('');
  const text2Ref = useRef(fullText || '');
  const gameEndedRef = useRef(false);
  
  const updateHighlightByChar = useCallback((char) => {
    if (!char) {
      setHighlightKey(null);
      return;
    }
    
    let keyCode = null;
    if (char === ' ') keyCode = 'Space';
    else if (char === 'Ё') keyCode = 'Backquote';
    else {
      const allKeys = document.querySelectorAll('.key');
      for (let k of allKeys) {
        if (k.textContent && k.textContent.includes(char.toUpperCase())) {
          keyCode = k.getAttribute('data-key');
          break;
        }
      }
    }
    setHighlightKey(keyCode);
  }, []);
  
  const finishGame = useCallback(() => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    setIsActive(false);
    const clickTime = rightKeysRef.current > 0 ? clickAllTimeRef.current / rightKeysRef.current : 0;
    onGameEnd({ rightKeys: rightKeysRef.current, wrongKeys, clickTime });
  }, [onGameEnd, wrongKeys]);
  
  useEffect(() => {
    if (!isActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isActive, finishGame]);
  
  useEffect(() => {
    if (text2Ref.current?.length > 0 && isActive && !stopwatchStartRef.current && !gameEndedRef.current) {
      stopwatchStartRef.current = performance.now();
    }
  }, [isActive]);
  
  const formatTextOnKeyDown = useCallback(() => {
    if (text2Ref.current.length === 0) return false;
    
    const charToMove = text2Ref.current[0];
    const newText1 = text1Ref.current + charToMove;
    const newText2 = text2Ref.current.slice(1);
    
    setText1(newText1);
    setText2(newText2);
    text1Ref.current = newText1;
    text2Ref.current = newText2;
    
    if (newText2.length > 0) {
      const nextChar = newText2[0];
      setCurrentChar(nextChar);
      updateHighlightByChar(nextChar);
    } else {
      setCurrentChar('');
      setHighlightKey(null);
    }
    
    if (stopwatchStartRef.current) {
      const elapsed = performance.now() - stopwatchStartRef.current;
      clickAllTimeRef.current += elapsed;
      stopwatchStartRef.current = null;
      rightKeysRef.current++;
      setRightKeys(rightKeysRef.current);
    }
    
    return true;
  }, [updateHighlightByChar]);
  
  const handleKeyPress = useCallback((e) => {
    if (!isActive || gameEndedRef.current) return;
    
    const pressedKey = e.key;
    const expectedChar = text2Ref.current[0];
    const pressedCode = e.code;
    
    if (pressedKey === 'Shift' || pressedKey === 'Control' || pressedKey === 'Alt' || pressedKey === 'Meta') return;
    
    if (pressedKey === 'Backspace') {
      if (text1Ref.current.length > 0) {
        const lastChar = text1Ref.current[text1Ref.current.length - 1];
        const newText1 = text1Ref.current.slice(0, -1);
        const newText2 = lastChar + text2Ref.current;
        
        setText1(newText1);
        setText2(newText2);
        text1Ref.current = newText1;
        text2Ref.current = newText2;
        
        if (newText2.length > 0) {
          setCurrentChar(newText2[0]);
          updateHighlightByChar(newText2[0]);
        } else {
          setCurrentChar('');
          setHighlightKey(null);
        }
      }
      return;
    }
    
    if (!expectedChar) {
      finishGame();
      return;
    }
    
    let isCorrect = false;
    if (expectedChar === pressedKey) isCorrect = true;
    else if (expectedChar === 'Ё' && pressedKey === '`') isCorrect = true;
    else if (expectedChar === ' ' && pressedKey === ' ') isCorrect = true;
    
    if (isCorrect) {
      formatTextOnKeyDown();
      
      setGreenFlash(pressedCode);
      setTimeout(() => setGreenFlash(null), 150);
      
      if (text2Ref.current.length > 0 && !stopwatchStartRef.current) {
        stopwatchStartRef.current = performance.now();
      }
      
      if (text2Ref.current.length === 0) {
        finishGame();
      }
    } else {
      setWrongKeys(prev => prev + 1);
      setRedFlash(pressedCode);
      setTimeout(() => setRedFlash(null), 200);
    }
  }, [isActive, formatTextOnKeyDown, finishGame, updateHighlightByChar]);
  
  return {
    text1,
    text2,
    timeLeft,
    rightKeys,
    wrongKeys,
    currentChar,
    highlightKey,
    greenFlash,
    redFlash,
    handleKeyPress
  };
};