import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyCalculator from '../../src/components/CurrencyCalculator/CurrencyCalculator';
import * as api from '../../src/services/exchangeRateService';

vi.mock('../../src/services/exchangeRateService');

describe('CurrencyCalculator Integration', () => {
  it('should render and perform basic conversion', async () => {
    const mockRates = {
      result: 'success',
      conversion_rates: { EUR: 0.92, USD: 1 }
    };
    (api.fetchExchangeRates as any).mockResolvedValue(mockRates);

    render(<CurrencyCalculator />);

    // Wait for initial load
    expect(await screen.findByText(/1 USD =/i)).toBeInTheDocument();
    
    const amountInput = screen.getByLabelText(/Amount/i);
    fireEvent.change(amountInput, { target: { value: '100' } });

    // Result should update
    expect(screen.getByText(/€92.00/i)).toBeInTheDocument();
  });

  it('should debounce input updates', async () => {
    vi.useFakeTimers();
    const mockRates = {
      result: 'success',
      conversion_rates: { EUR: 0.92, USD: 1 }
    };
    (api.fetchExchangeRates as any).mockResolvedValue(mockRates);

    render(<CurrencyCalculator />);

    const amountInput = screen.getByLabelText(/Amount/i);
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.change(amountInput, { target: { value: '100' } });

    // Should not have updated yet because of debounce
    expect(screen.queryByText(/€92.00/i)).not.toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(300);
    
    expect(await screen.findByText(/€92.00/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('should display error message on API failure', async () => {
    (api.fetchExchangeRates as any).mockRejectedValue(new Error('Network Error'));

    render(<CurrencyCalculator />);

    expect(await screen.findByText(/Network Error/i)).toBeInTheDocument();
  });
});
