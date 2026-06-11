/**
 * Mock data service for currency exchange rates.
 * This module is dynamically imported in mock mode to ensure it's code-split from the production bundle.
 */

import { ExchangeRateAPIResponse } from '../types';

/**
 * MOCK_RATES defined relative to USD (1.0).
 * Update these values to test different UI states or edge cases.
 */
export const MOCK_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.42,
  AUD: 1.52,
  CAD: 1.35,
  CHF: 0.90,
  CNY: 7.23,
  HKD: 7.83,
  NZD: 1.66,
  PLN: 4.01,
  // Edge Case: Extremely low rate
  BTC: 0.000015,
  // Edge Case: Extremely high rate
  IDR: 15720.50,
};

/**
 * Returns mock exchange rates for a given base currency.
 * Rates are simulated and do not reflect real-time market data.
 */
export const getMockRates = (baseCurrency: string): ExchangeRateAPIResponse => {
  console.log(`[MockDataService] Generating mock rates for ${baseCurrency}`);
  
  const baseRate = MOCK_RATES[baseCurrency] || 1.0;
  const conversion_rates: Record<string, number> = {};

  // Calculate rates relative to the base currency
  Object.entries(MOCK_RATES).forEach(([currency, rate]) => {
    conversion_rates[currency] = parseFloat((rate / baseRate).toFixed(6));
  });

  return {
    result: 'success',
    documentation: 'https://www.exchangerate-api.com/docs/free',
    terms_of_use: 'https://www.exchangerate-api.com/terms',
    time_last_update_unix: Math.floor(Date.now() / 1000),
    time_last_update_utc: new Date().toUTCString(),
    time_next_update_unix: Math.floor(Date.now() / 1000) + 86400,
    time_next_update_utc: new Date(Date.now() + 86400000).toUTCString(),
    base_code: baseCurrency,
    conversion_rates,
    isMock: true,
  };
};
