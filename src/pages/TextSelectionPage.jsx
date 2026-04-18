import { useState, useRef } from 'react';
import { levels } from '../services/levels';
import '../styles/TextSelectionPage.css';

function TextSelectionPage({ onNavigate, onTextTypeSelect }) {
  const [selectedType, setSelectedType] = useState('random');
  const [selectedLevel, setSelectedLevel] = useState(Object.keys(levels)[0]);
  const [selectedDatabaseText, setSelectedDatabaseText] = useState('Текст 1');
  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const databaseTexts = ['Текст 1', 'Текст 2', 'Текст 3'];
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/plain') {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file, 'UTF-8');
    } else {
      alert('Пожалуйста, выберите текстовый файл (.txt)');
    }
  };
  
  const handleNext = () => {
    let config = { type: selectedType, data: '' };
    
    if (selectedType === 'random') {
      config.data = '__RANDOM__';
    } else if (selectedType === 'computer') {
      if (!fileContent) {
        alert('Выберите файл с текстом');
        return;
      }
      config.data = fileContent;
    } else if (selectedType === 'database') {
      config.data = `__DB__:${selectedDatabaseText}`;
    } else if (selectedType === 'levels') {
      config.data = `__LEVEL__:${selectedLevel}`;
    }
    
    onTextTypeSelect(config);
    onNavigate('time');
  };
  
  return (
    <div className='text-selection-container'>
      <h1 className='title'>Выберите текст</h1>
      <div className='options-group'>
        <label className='radio-label'>
          <input
            type='radio'
            name='textType'
            value='random'
            checked={selectedType === 'random'}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span>Рандомные символы</span>
        </label>
        
        <label className='radio-label'>
          <input
            type='radio'
            name='textType'
            value='computer'
            checked={selectedType === 'computer'}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span>Текст из файла на этом компьютере</span>
        </label>
        
        <label className='radio-label'>
          <input
            type='radio'
            name='textType'
            value='database'
            checked={selectedType === 'database'}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span>Выбрать текст</span>
        </label>
        
        <label className='radio-label'>
          <input
            type='radio'
            name='textType'
            value='levels'
            checked={selectedType === 'levels'}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          <span>Уровни сложности</span>
        </label>
      </div>
      
      {selectedType === 'computer' && (
        <div className='file-selection-area'>
          <input
            type="file"
            ref={fileInputRef}
            accept=".txt"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <button 
            className='browse-btn'
            onClick={() => fileInputRef.current.click()}
          >
            Выбрать файл
          </button>
          {fileName && (
            <div className='file-info'>
              <span>Выбран файл: {fileName}</span>
              <span className='file-size'>
                {fileContent ? `${fileContent.length} символов` : ''}
              </span>
            </div>
          )}
        </div>
      )}
      
      {selectedType === 'database' && (
        <select 
          className='select-dropdown'
          value={selectedDatabaseText}
          onChange={(e) => setSelectedDatabaseText(e.target.value)}
        >
          {databaseTexts.map((text, idx) => (
            <option key={idx}>{text}</option>
          ))}
        </select>
      )}
      
      {selectedType === 'levels' && (
        <select 
          className='select-dropdown'
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {Object.keys(levels).map((level, idx) => (
            <option key={idx}>{level}</option>
          ))}
        </select>
      )}
      
      <button className='ok-btn' onClick={handleNext}>
        OK
      </button>
    </div>
  );
}

export default TextSelectionPage;