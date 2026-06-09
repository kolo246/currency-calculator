import React, { useState } from 'react';
import AmountInput from './AmountInput';
import CurrencyDropdown from './CurrencyDropdown';
import ResultCard from './ResultCard';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';
import './CurrencyCalculator.css';

const DEFAULT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD'];

const CurrencyCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('EUR');

  const { result, isLoading, error, rates } = useCurrencyConverter(amount, from, to);
  
  const availableCurrencies = rates.length > 0 ? rates : DEFAULT_CURRENCIES;

  return (
    <div className="currency-calculator">
      <h1>Currency Calculator</h1>
      <div className="inputs-container">
        <AmountInput value={amount} onChange={setAmount} />
        <div className="dropdowns-row">
          <CurrencyDropdown
            label="From"
            value={from}
            onChange={setFrom}
            currencies={availableCurrencies}
          />
          <CurrencyDropdown
            label="To"
            value={to}
            onChange={setTo}
            currencies={availableCurrencies}
          />
        </div>
      </div>
      <ResultCard
        amount={amount}
        from={from}
        to={to}
        result={result}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default CurrencyCalculator;
