import { ExchangeRateAPIResponse } from '../types';

export const MOCK_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.5,
  AUD: 1.52,
  CAD: 1.35,
};

export const getMockRates = (baseCurrency: string): ExchangeRateAPIResponse => {
  const now = new Date();
  
  // Calculate rates relative to the requested base currency
  const baseRate = MOCK_RATES[baseCurrency] || 1.0;
  const relativeRates: Record<string, number> = {};
  
  Object.keys(MOCK_RATES).forEach((currency) => {
    relativeRates[currency] = parseFloat((MOCK_RATES[currency] / baseRate).toFixed(6));
  });

  return {
    result: 'success',
    documentation: 'https://v6.exchangerate-api.com/docs',
    terms_of_use: 'https://v6.exchangerate-api.com/terms',
    time_last_update_unix: Math.floor(now.getTime() / 1000),
    time_last_update_utc: now.toUTCString(),
    time_next_update_unix: Math.floor(now.getTime() / 1000) + 86400,
    time_next_update_utc: new Date(now.getTime() + 86400000).toUTCString(),
    base_code: baseCurrency,
    conversion_rates: relativeRates,
  };
};
