import React from 'react';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const AmountInput: React.FC<AmountInputProps> = ({ value, onChange, label = 'Amount' }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(isNaN(val) ? 0 : Math.max(0, val));
  };

  return (
    <div className="amount-input-group">
      <label htmlFor="amount-input">{label}</label>
      <input
        id="amount-input"
        type="number"
        value={value === 0 ? '' : value}
        onChange={handleChange}
        placeholder="Enter amount"
        min="0"
        step="any"
        aria-label={label}
        aria-required="true"
      />
    </div>
  );
};

export default AmountInput;
