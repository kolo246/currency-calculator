import { CachedRates } from '../types';

const CACHE_PREFIX = 'currency_rates_';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

export const setCachedRates = (base: string, rates: Record<string, number>): void => {
  const cacheData: CachedRates = {
    rates,
    timestamp: Date.now(),
    base,
  };
  localStorage.setItem(`${CACHE_PREFIX}${base}`, JSON.stringify(cacheData));
};

export const getCachedRates = (base: string): Record<string, number> | null => {
  const cached = localStorage.getItem(`${CACHE_PREFIX}${base}`);
  if (!cached) return null;

  try {
    const cacheData: CachedRates = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > CACHE_TTL;

    if (isExpired) {
      localStorage.removeItem(`${CACHE_PREFIX}${base}`);
      return null;
    }

    return cacheData.rates;
  } catch (error) {
    console.error('Failed to parse cached rates', error);
    return null;
  }
};

export const clearCache = (): void => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(CACHE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
};
