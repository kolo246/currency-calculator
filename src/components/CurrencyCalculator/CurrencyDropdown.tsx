import React from 'react';

interface CurrencyDropdownProps {
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
  label: string;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({ value, onChange, currencies, label }) => {
  const id = `currency-select-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="currency-dropdown-group">
      <label htmlFor={id}>{label}</label>
      <select 
        id={id}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
