import {useState} from 'react';
import '../styles/TextSelectionPage.css';

function TextSelectionPage({onNavigate, onTextTypeSelect}){
    const [selectedType, setSelectedType] = useState('random');
    const handleNext = () => {
        onTextTypeSelect(selectedType);
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
                        checked={selectedType==='random'}
                        onChange={(e)=>setSelectedType(e.target.value)}
                    />
                    <span>Рандомные символы</span>
                </label>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='textType'
                        value='computer'
                        checked={selectedType==='computer'}
                        onChange={(e)=>setSelectedType(e.target.value)}
                    />
                    <span>Текст из файла на этом компьютере</span>
                </label>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='textType'
                        value='database'
                        checked={selectedType==='database'}
                        onChange={(e)=>setSelectedType(e.target.value)}
                    />
                    <span>Выбрать текст</span>
                </label>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='textType'
                        value='levels'
                        checked={selectedType==='levels'}
                        onChange={(e)=>setSelectedType(e.target.value)}
                    />
                    <span>Уровни сложности</span>
                </label>
            </div>

            {selectedType === 'computer' && (
                <div className='extra-field'>
                    <input type="text" placeholder='Путь к файлу' className='file-input'/>
                    <button className='browse-btn'>Обзор</button>
                </div>
            )}
            {selectedType === 'database' && (
                <select className='select-dropdawn'>
                    <option>Текст1</option>
                    <option>Текст2</option>
                </select>
            )}
            {selectedType === 'levels' && (
                <select className='select-dropdawn'>
                    <option>ва ол (рус.)</option>
                    <option>фы дж (рус.)</option>
                    <option>ми ть (рус.)</option>
                    <option>еп нр (рус.)</option>
                </select>
            )}

            <button className='ok-btn' onClick={handleNext}>
                Ok
            </button>
        </div>
    );
}
export default TextSelectionPage;