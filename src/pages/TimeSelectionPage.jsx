import {useState} from 'react';
import '../styles/TimeSelectionPage.css';

function TimeSelectionPage({onNavigate, onTimeSelect}){
    const [selectedTime, setSelectedTime] = useState(30);
    const [isSliderMode, setIsSliderMode] = useState(false);
    const handleNext=()=>{
        onTimeSelect(selectedTime);
        onNavigate('typing');
    };

    return (
        <div className='time-selection-container'>
            <h1 className='title'>Выберите время</h1>
            <div className='options-group'>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='time'
                        value={10}
                        checked={!isSliderMode && selectedTime === 10}
                        onChange={()=>{
                            setSelectedTime(10);
                            setIsSliderMode(false);
                        }}
                    />
                    <span>10 секунд</span>
                </label>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='time'
                        value={30}
                        checked={!isSliderMode && selectedTime === 30}
                        onChange={()=>{
                            setSelectedTime(30);
                            setIsSliderMode(false);
                        }}
                    />
                    <span>30 секунд</span>
                </label>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='time'
                        value={60}
                        checked={!isSliderMode && selectedTime === 60}
                        onChange={()=>{
                            setSelectedTime(60);
                            setIsSliderMode(false);
                        }}
                    />
                    <span>60 секунд</span>
                </label>
                <label className='radio-label'>
                    <input
                        type='radio'
                        name='time'
                        checked={isSliderMode}
                        onChange={()=>{
                            setIsSliderMode(true);
                        }}
                    />
                    <span>Ползунок</span>
                </label>
            </div>
            {isSliderMode && (
                <div className='slider-container'>
                    <input
                        type='range'
                        min='1'
                        max='240'
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(Number(e.target.value))}
                        className='time-slider'
                    />
                    <div className='slider-labels'>
                        <span>1</span>
                        <span>{selectedTime} сек</span>
                        <span>240</span>
                    </div>
                </div>
            )}
            <button className='ok-btn' onClick={handleNext}>
                Ok
            </button>
        </div>
    );
}
export default TimeSelectionPage;