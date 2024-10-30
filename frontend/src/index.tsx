import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import App from './App'; // Asegúrate de que este archivo existe y está correctamente nombrado
import reportWebVitals from './reportWebVitals'; // Asegúrate de que este archivo existe y está correctamente nombrado

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();