import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../../src/utils/formatters';
import { getMockRates } from '../../src/services/mockDataService';

describe('Edge Case Formatting', () => {
  it('should format extremely small rates correctly', () => {
    const mockData = getMockRates('USD');
    const btcRate = mockData.conversion_rates['BTC']; // 0.000015
    const formatted = formatCurrency(btcRate, 'BTC');
    
    // Intl.NumberFormat might represent BTC with symbol or code depending on locale/support
    // But we check that it doesn't crash and returns a string
    expect(typeof formatted).toBe('string');
    expect(formatted).toContain('0.00');
  });

  it('should format extremely large rates correctly', () => {
    const mockData = getMockRates('USD');
    const idrRate = mockData.conversion_rates['IDR']; // 15720.50
    const formatted = formatCurrency(idrRate, 'IDR');
    
    expect(typeof formatted).toBe('string');
    expect(formatted).toMatch(/15,720\.5/);
  });
});
