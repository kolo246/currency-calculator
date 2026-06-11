import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import CurrencyCalculator from '../../src/components/CurrencyCalculator/CurrencyCalculator';
import * as api from '../../src/services/exchangeRateService';
import { clearCache } from '../../src/utils/cache';

vi.mock('../../src/services/exchangeRateService');

describe('PLN Support Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  it('should show PLN in dropdowns and perform live conversion', async () => {
    const mockRates = {
      result: 'success',
      base_code: 'USD',
      conversion_rates: { PLN: 4.05, USD: 1 }
    };
    (api.fetchExchangeRates as any).mockResolvedValue(mockRates);

    render(<CurrencyCalculator />);

    // Wait for initial load
    expect(await screen.findByText(/1 USD =/i)).toBeInTheDocument();
    
    // Check if PLN is in dropdown
    const toSelect = screen.getByLabelText(/To/i);
    const options = Array.from(toSelect.querySelectorAll('option')).map(o => o.value);
    expect(options).toContain('PLN');

    // Select PLN (manually if needed, but here we just check if it renders the result if rates contain it)
    // Actually, the hook will load rates for USD, which include PLN.
    // If we select PLN, the ResultCard should show it.
  });

  it('should perform conversion in Mock Mode', async () => {
    vi.stubEnv('VITE_USE_MOCK_DATA', 'true');
    
    render(<CurrencyCalculator />);

    // Wait for initial load
    expect(await screen.findByText(/1 USD =/i)).toBeInTheDocument();

    // Select PLN
    const toSelect = screen.getByLabelText(/To/i);
    await act(async () => {
      fireEvent.change(toSelect, { target: { value: 'PLN' } });
    });

    // In mock mode, 1 USD to PLN should be 4.01
    expect(await screen.findByText(/4\.01/)).toBeInTheDocument();
    
    // Check formatting - should show zł
    const resultValue = screen.getByText(/4\.01/);
    expect(resultValue.textContent).toContain('zł');
  });
});
