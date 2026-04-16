// Словарь для поиска клавиши по символу
export const charToKeyMap = {
  // Русские буквы (верхний регистр для отображения)
  'Й': 'KeyQ', 'Ц': 'KeyW', 'У': 'KeyE', 'К': 'KeyR', 'Е': 'KeyT', 'Н': 'KeyY', 'Г': 'KeyU', 'Ш': 'KeyI', 'Щ': 'KeyO', 'З': 'KeyP', 'Х': 'BracketLeft', 'Ъ': 'BracketRight',
  'Ф': 'KeyA', 'Ы': 'KeyS', 'В': 'KeyD', 'А': 'KeyF', 'П': 'KeyG', 'Р': 'KeyH', 'О': 'KeyJ', 'Л': 'KeyK', 'Д': 'KeyL', 'Ж': 'Semicolon', 'Э': 'Quote', 'Ё': 'Backquote',
  'Я': 'KeyZ', 'Ч': 'KeyX', 'С': 'KeyC', 'М': 'KeyV', 'И': 'KeyB', 'Т': 'KeyN', 'Ь': 'KeyM', 'Б': 'Comma', 'Ю': 'Period', '.': 'Slash',
  // Английские буквы
  'Q': 'KeyQ', 'W': 'KeyW', 'E': 'KeyE', 'R': 'KeyR', 'T': 'KeyT', 'Y': 'KeyY', 'U': 'KeyU', 'I': 'KeyI', 'O': 'KeyO', 'P': 'KeyP', '[': 'BracketLeft', ']': 'BracketRight',
  'A': 'KeyA', 'S': 'KeyS', 'D': 'KeyD', 'F': 'KeyF', 'G': 'KeyG', 'H': 'KeyH', 'J': 'KeyJ', 'K': 'KeyK', 'L': 'KeyL', ';': 'Semicolon', "'": 'Quote',
  'Z': 'KeyZ', 'X': 'KeyX', 'C': 'KeyC', 'V': 'KeyV', 'B': 'KeyB', 'N': 'KeyN', 'M': 'KeyM', ',': 'Comma', '.': 'Period', '/': 'Slash',
  // Цифры и символы
  '`': 'Backquote', '1': 'Digit1', '2': 'Digit2', '3': 'Digit3', '4': 'Digit4', '5': 'Digit5',
  '6': 'Digit6', '7': 'Digit7', '8': 'Digit8', '9': 'Digit9', '0': 'Digit0', '-': 'Minus', '=': 'Equal',
  ' ': 'Space', 'Backspace': 'Backspace', 'Enter': 'Enter', 'Shift': 'ShiftLeft'
};

// Получить data-key по символу
export const getKeyCodeByChar = (char) => {
  const upperChar = char.toUpperCase();
  return charToKeyMap[upperChar] || null;
};