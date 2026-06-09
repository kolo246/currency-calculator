import React from 'react';
import ReactDOM from 'react-dom/client';
import CurrencyCalculator from './components/CurrencyCalculator/CurrencyCalculator';
import './styles/variables.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrencyCalculator />
  </React.StrictMode>
);
