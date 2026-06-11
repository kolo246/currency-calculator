import { describe, it, expect } from 'vitest';
import { getMockRates } from '../../src/services/mockDataService';

describe('mockDataService', () => {
  const DEFAULT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'HKD', 'NZD'];

  it('should return a successful response object with all default currencies', () => {
    const response = getMockRates('USD');
    expect(response.result).toBe('success');
    expect(response.base_code).toBe('USD');
    expect(response.isMock).toBe(true);
    
    DEFAULT_CURRENCIES.forEach(currency => {
      expect(response.conversion_rates).toHaveProperty(currency);
      expect(typeof response.conversion_rates[currency]).toBe('number');
    });
  });

  it('should calculate rates relative to the base currency', () => {
    const response = getMockRates('EUR');
    expect(response.base_code).toBe('EUR');
    expect(response.conversion_rates['EUR']).toBe(1);
    // 1 USD is ~1.087 EUR (1 / 0.92)
    expect(response.conversion_rates['USD']).toBeCloseTo(1.086957, 5);
  });
});
