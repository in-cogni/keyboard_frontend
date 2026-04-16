import '../styles/Keyboard.css';

const Keyboard = ({ highlightKey, greenFlashKey, redFlashKey }) => {
  const rows = [
    [
      { eng: '`', rus: 'Ё', code: 'Backquote' },
      { eng: '1', rus: '1', code: 'Digit1' },
      { eng: '2', rus: '2', code: 'Digit2' },
      { eng: '3', rus: '3', code: 'Digit3' },
      { eng: '4', rus: '4', code: 'Digit4' },
      { eng: '5', rus: '5', code: 'Digit5' },
      { eng: '6', rus: '6', code: 'Digit6' },
      { eng: '7', rus: '7', code: 'Digit7' },
      { eng: '8', rus: '8', code: 'Digit8' },
      { eng: '9', rus: '9', code: 'Digit9' },
      { eng: '0', rus: '0', code: 'Digit0' },
      { eng: '-', rus: '-', code: 'Minus' },
      { eng: '=', rus: '=', code: 'Equal' },
      { eng: 'Backspace', rus: 'Backspace', code: 'Backspace', wide: true }
    ],
    [
      { eng: 'Tab', rus: 'Tab', code: 'Tab', wide: true },
      { eng: 'Q', rus: 'Й', code: 'KeyQ' },
      { eng: 'W', rus: 'Ц', code: 'KeyW' },
      { eng: 'E', rus: 'У', code: 'KeyE' },
      { eng: 'R', rus: 'К', code: 'KeyR' },
      { eng: 'T', rus: 'Е', code: 'KeyT' },
      { eng: 'Y', rus: 'Н', code: 'KeyY' },
      { eng: 'U', rus: 'Г', code: 'KeyU' },
      { eng: 'I', rus: 'Ш', code: 'KeyI' },
      { eng: 'O', rus: 'Щ', code: 'KeyO' },
      { eng: 'P', rus: 'З', code: 'KeyP' },
      { eng: '[', rus: 'Х', code: 'BracketLeft' },
      { eng: ']', rus: 'Ъ', code: 'BracketRight' },
      { eng: '\\', rus: '\\', code: 'Backslash' }
    ],
    [
      { eng: 'CapsLock', rus: 'CapsLock', code: 'CapsLock', wide: true },
      { eng: 'A', rus: 'Ф', code: 'KeyA' },
      { eng: 'S', rus: 'Ы', code: 'KeyS' },
      { eng: 'D', rus: 'В', code: 'KeyD' },
      { eng: 'F', rus: 'А', code: 'KeyF' },
      { eng: 'G', rus: 'П', code: 'KeyG' },
      { eng: 'H', rus: 'Р', code: 'KeyH' },
      { eng: 'J', rus: 'О', code: 'KeyJ' },
      { eng: 'K', rus: 'Л', code: 'KeyK' },
      { eng: 'L', rus: 'Д', code: 'KeyL' },
      { eng: ';', rus: 'Ж', code: 'Semicolon' },
      { eng: "'", rus: 'Э', code: 'Quote' },
      { eng: 'Enter', rus: 'Enter', code: 'Enter', wide: true }
    ],
    [
      { eng: 'Shift', rus: 'Shift', code: 'ShiftLeft', wide: true },
      { eng: 'Z', rus: 'Я', code: 'KeyZ' },
      { eng: 'X', rus: 'Ч', code: 'KeyX' },
      { eng: 'C', rus: 'С', code: 'KeyC' },
      { eng: 'V', rus: 'М', code: 'KeyV' },
      { eng: 'B', rus: 'И', code: 'KeyB' },
      { eng: 'N', rus: 'Т', code: 'KeyN' },
      { eng: 'M', rus: 'Ь', code: 'KeyM' },
      { eng: ',', rus: 'Б', code: 'Comma' },
      { eng: '.', rus: 'Ю', code: 'Period' },
      { eng: '/', rus: '.', code: 'Slash' },
      { eng: 'Shift', rus: 'Shift', code: 'ShiftRight', wide: true }
    ],
    [
      { eng: 'Ctrl', rus: 'Ctrl', code: 'ControlLeft', wide: true },
      { eng: 'Win', rus: 'Win', code: 'MetaLeft', wide: true },
      { eng: 'Alt', rus: 'Alt', code: 'AltLeft', wide: true },
      { eng: '', rus: '', code: 'Space', veryWide: true },
      { eng: 'Alt', rus: 'Alt', code: 'AltRight', wide: true },
      { eng: 'Win', rus: 'Win', code: 'MetaRight', wide: true },
      { eng: 'Menu', rus: 'Menu', code: 'ContextMenu', wide: true },
      { eng: 'Ctrl', rus: 'Ctrl', code: 'ControlRight', wide: true }
    ]
  ];

  const getKeyClass = (code) => {
    let cls = 'key';
    if (greenFlashKey === code) cls += ' flash-green';
    if (redFlashKey === code) cls += ' flash-red';
    if (highlightKey === code) cls += ' highlight';
    return cls;
  };

  return (
    <div className="keyboard-container">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key, j) => (
            <div
              key={j}
              data-key={key.code}
              className={`${getKeyClass(key.code)} ${key.wide ? 'wide' : ''} ${key.veryWide ? 'very-wide' : ''}`}
            >
              {key.rus !== key.eng ? `${key.eng} / ${key.rus}` : key.eng}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;