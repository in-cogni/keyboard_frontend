import '../styles/ProgressText.css';

function ProgressText({ originalText, currentIndex, userInput }) {
  const typed = originalText.slice(0, currentIndex);
  const current = originalText[currentIndex] || '';
  const remaining = originalText.slice(currentIndex + 1);

  return (
    <div className="progress-text-container">
      <div className="text-line">
        <span className="typed-text">{typed}</span>
        <span className="current-char">{current}</span>
        <span className="remaining-text">{remaining}</span>
      </div>
    </div>
  );
}

export default ProgressText;