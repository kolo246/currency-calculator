import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CurrencyCalculator from '../../src/components/CurrencyCalculator/CurrencyCalculator';
import * as api from '../../src/services/exchangeRateService';
import { clearCache } from '../../src/utils/cache';

vi.mock('../../src/services/exchangeRateService');

describe('CurrencyCalculator Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    clearCache();
  });

  it('should render and perform basic conversion', async () => {
    const mockRates = {
      result: 'success',
      conversion_rates: { EUR: 0.92, USD: 1 },
      base_code: 'USD'
    };
    (api.fetchExchangeRates as any).mockResolvedValue(mockRates);

    render(<CurrencyCalculator />);

    // Wait for initial load
    expect(await screen.findByText(/1 USD =/i)).toBeInTheDocument();
    
    const amountInput = screen.getByLabelText(/Amount/i);
    await act(async () => {
      fireEvent.change(amountInput, { target: { value: '100' } });
    });

    // Wait for debounce and result update
    expect(await screen.findByText(/€92.00/i)).toBeInTheDocument();
  });

  it('should debounce input updates', async () => {
    vi.useFakeTimers();
    const mockRates = {
      result: 'success',
      conversion_rates: { EUR: 0.92, USD: 1 },
      base_code: 'USD'
    };
    (api.fetchExchangeRates as any).mockResolvedValue(mockRates);

    render(<CurrencyCalculator />);

    // Initial fetch debounce
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    const amountInput = screen.getByLabelText(/Amount/i);
    
    await act(async () => {
      fireEvent.change(amountInput, { target: { value: '10' } });
      fireEvent.change(amountInput, { target: { value: '100' } });
    });

    // Should not have updated yet because of debounce
    expect(screen.queryByText(/€92.00/i)).not.toBeInTheDocument();

    // Fast-forward time for amount debounce
    await act(async () => {
      vi.advanceTimersByTime(300);
    });
    
    expect(screen.getByText(/€92.00/i)).toBeInTheDocument();
  });

  it('should display error message on API failure', async () => {
    (api.fetchExchangeRates as any).mockRejectedValue(new Error('Network Error'));

    render(<CurrencyCalculator />);

    // Increased timeout for this specific wait if needed, but 5s should be enough
    expect(await screen.findByText(/Network Error/i)).toBeInTheDocument();
  });
});
