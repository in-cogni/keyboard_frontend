import '../styles/ResultPage.css';

function ResultPage({ result, onRestart, onExit }) {
  const totalHits = result.rightKeys + result.wrongKeys;
  const accuracy = totalHits > 0 ? Math.round((result.rightKeys / totalHits) * 100) : 0;
  
  let cpm = 0;
  if (result.clickTime > 0 && result.rightKeys > 0) {
    const avgTimeInSeconds = result.clickTime / 1000;
    cpm = Math.round(60 / avgTimeInSeconds);
  }
  
  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">Время вышло!</h1>
        
        <div className="result-stats">
          <div className="stat-row">
            <span className="stat-label">Правильных нажатий:</span>
            <span className="stat-value">{result.rightKeys}</span>
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Ошибок:</span>
            <span className="stat-value">{result.wrongKeys}</span>
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Точность:</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Скорость:</span>
            <span className="stat-value">{cpm} симв/мин</span>
          </div>
          
          <div className="stat-row">
            <span className="stat-label">Среднее время нажатия:</span>
            <span className="stat-value">{result.clickTime ? result.clickTime.toFixed(2) : 0} мс</span>
          </div>
        </div>
        
        <div className="result-buttons">
          <button className="restart-btn" onClick={onRestart}>
            Перезапуск
          </button>
          <button className="exit-btn" onClick={onExit}>
            Выход
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;