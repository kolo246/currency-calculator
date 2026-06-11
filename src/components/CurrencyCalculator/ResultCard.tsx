import React from 'react';
import { formatCurrency } from '../../utils/formatters';

interface ResultCardProps {
  amount: number;
  from: string;
  to: string;
  result: number;
  isLoading?: boolean;
  error?: string | null;
  isMock?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ amount, from, to, result, isLoading, error, isMock }) => {
  if (error) {
    return <div className="result-card error" role="alert">{error}</div>;
  }

  if (isLoading) {
    return <div className="result-card loading" aria-busy="true" aria-live="polite">Calculating...</div>;
  }

  return (
    <div className="result-card" aria-live="polite">
      {isMock && (
        <div className="mock-badge" title="Using simulated exchange rates">
          Mock Mode
        </div>
      )}
      <div className="result-summary">
        {amount} {from} =
      </div>
      <div className="result-value">
        {formatCurrency(result, to)}
      </div>
    </div>
  );
};

export default ResultCard;
