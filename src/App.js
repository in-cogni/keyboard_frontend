import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const callBackend = async () => {
    const response = await fetch('https://localhost:7102/api/values');
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Typing Trainer</h1>
      <button onClick={callBackend}>Get Hello from Backend</button>
      {message && <p>Ответ от бэкенда: {message}</p>}
    </div>
  );
}

export default App;