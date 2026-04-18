import { useState, useEffect, useRef, useCallback } from 'react';
import { getKeyCodeByChar } from '../services/keyboardMap';

export const useTypingGame = (timeLimitSeconds, fullText, onGameEnd) => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState(fullText || '');
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [isActive, setIsActive] = useState(true);
  const [rightKeys, setRightKeys] = useState(0);
  const [wrongKeys, setWrongKeys] = useState(0);
  const [currentChar, setCurrentChar] = useState(fullText?.[0] || '');
  const [highlightKey, setHighlightKey] = useState(null);
  const [highlightShift, setHighlightShift] = useState(false);
  const [greenFlash, setGreenFlash] = useState(null);
  const [redFlash, setRedFlash] = useState(null);
  
  const timerRef = useRef(null);
  const clickAllTimeRef = useRef(0);
  const stopwatchStartRef = useRef(null);
  const rightKeysRef = useRef(0);
  const text1Ref = useRef('');
  const text2Ref = useRef(fullText || '');
  const gameEndedRef = useRef(false);
  const timeLeftRef = useRef(timeLimitSeconds);
  const startTimeRef = useRef(Date.now());
  
  const getBaseKeyChar = (char) => {
    const map = {
      '!': '1', '@': '2', '#': '3', '$': '4', '%': '5',
      '^': '6', '&': '7', '*': '8', '(': '9', ')': '0',
      '_': '-', '+': '=', '{': '[', '}': ']', ':': ';',
      '"': "'", '<': ',', '>': '.', '?': '/', '~': '`', '|': '\\'
    };
    return map[char] || char;
  };
  
  const needsShift = (char) => {
    if (!char) return false;
    if (char >= 'А' && char <= 'Я') return true;
    if (char >= 'A' && char <= 'Z') return true;
    const shiftSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', ':', '"', '<', '>', '?', '~', '|'];
    return shiftSymbols.includes(char);
  };
  
  const updateHighlight = useCallback((char) => {
    if (!char) {
      setHighlightKey(null);
      setHighlightShift(false);
      return;
    }
    
    const baseChar = getBaseKeyChar(char);
    const keyCode = getKeyCodeByChar(baseChar);
    setHighlightKey(keyCode);
    
    if (needsShift(char)) {
      setHighlightShift(true);
    } else {
      setHighlightShift(false);
    }
  }, []);
  
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
  }, [isActive]);
  
  const finishGame = useCallback(() => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    setIsActive(false);
    
    const clickTime = rightKeysRef.current > 0 ? clickAllTimeRef.current / rightKeysRef.current : 0;
    onGameEnd({ rightKeys: rightKeysRef.current, wrongKeys, clickTime });
  }, [onGameEnd, wrongKeys]);
  
  useEffect(() => {
    if (text2Ref.current && text2Ref.current.length > 0 && isActive && !gameEndedRef.current) {
      const nextChar = text2Ref.current[0];
      setCurrentChar(nextChar);
      updateHighlight(nextChar);
    } else if (text2Ref.current && text2Ref.current.length === 0 && isActive && !gameEndedRef.current) {
      setCurrentChar('');
      setHighlightKey(null);
      setHighlightShift(false);
      finishGame();
    }
  }, [text2, isActive, finishGame, updateHighlight]);
  
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
      updateHighlight(nextChar);
    } else {
      setCurrentChar('');
      setHighlightKey(null);
      setHighlightShift(false);
    }
    
    if (stopwatchStartRef.current) {
      const elapsed = performance.now() - stopwatchStartRef.current;
      clickAllTimeRef.current += elapsed;
      stopwatchStartRef.current = null;
      rightKeysRef.current++;
      setRightKeys(rightKeysRef.current);
    }
    
    return true;
  }, [updateHighlight]);
  
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
          updateHighlight(newText2[0]);
        } else {
          setCurrentChar('');
          setHighlightKey(null);
          setHighlightShift(false);
        }
      }
      return;
    }
    
    if (!expectedChar) {
      finishGame();
      return;
    }
    
    let isCorrect = false;
    if (expectedChar === pressedKey) {
      isCorrect = true;
    } else if (expectedChar === 'Ё' && pressedKey === '`') {
      isCorrect = true;
    } else if (expectedChar === ' ' && pressedKey === ' ') {
      isCorrect = true;
    } else if (expectedChar === '*' && pressedKey === '8') {
      isCorrect = true;
    } else if (expectedChar === '(' && pressedKey === '9') {
      isCorrect = true;
    } else if (expectedChar === ')' && pressedKey === '0') {
      isCorrect = true;
    } else if (expectedChar === '_' && pressedKey === '-') {
      isCorrect = true;
    } else if (expectedChar === '+' && pressedKey === '=') {
      isCorrect = true;
    } else if (expectedChar === '!' && pressedKey === '1') {
      isCorrect = true;
    } else if (expectedChar === '@' && pressedKey === '2') {
      isCorrect = true;
    } else if (expectedChar === '#' && pressedKey === '3') {
      isCorrect = true;
    } else if (expectedChar === '$' && pressedKey === '4') {
      isCorrect = true;
    } else if (expectedChar === '%' && pressedKey === '5') {
      isCorrect = true;
    } else if (expectedChar === '^' && pressedKey === '6') {
      isCorrect = true;
    } else if (expectedChar === '&' && pressedKey === '7') {
      isCorrect = true;
    } else if (expectedChar === ':' && pressedKey === ';') {
      isCorrect = true;
    } else if (expectedChar === '"' && pressedKey === "'") {
      isCorrect = true;
    } else if (expectedChar === '<' && pressedKey === ',') {
      isCorrect = true;
    } else if (expectedChar === '>' && pressedKey === '.') {
      isCorrect = true;
    } else if (expectedChar === '?' && pressedKey === '/') {
      isCorrect = true;
    } else if (expectedChar === '~' && pressedKey === '`') {
      isCorrect = true;
    } else if (expectedChar === '|' && pressedKey === '\\') {
      isCorrect = true;
    } else if (expectedChar === '{' && pressedKey === '[') {
      isCorrect = true;
    } else if (expectedChar === '}' && pressedKey === ']') {
      isCorrect = true;
    }
    
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
  }, [isActive, formatTextOnKeyDown, finishGame, updateHighlight]);
  
  return {
    text1,
    text2,
    timeLeft,
    rightKeys,
    wrongKeys,
    currentChar,
    highlightKey,
    highlightShift,
    greenFlash,
    redFlash,
    handleKeyPress
  };
};