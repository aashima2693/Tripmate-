import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 🛑 PUSHBACK: This is the critical line. You MUST import your global styles 
// here to ensure the color variables, resets, and base typography are available 
// throughout your application. Don't skip this.
import './styles/global.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);