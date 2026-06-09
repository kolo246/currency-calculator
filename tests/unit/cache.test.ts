import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCachedRates, setCachedRates, clearCache } from '../../src/utils/cache';

describe('Cache Utility', () => {
  beforeEach(() => {
    localStorage.clear();
    clearCache();
  });

  it('should store and retrieve rates', () => {
    const rates = { EUR: 0.92 };
    setCachedRates('USD', rates);
    expect(getCachedRates('USD')).toEqual(rates);
  });

  it('should return null for expired rates', () => {
    const rates = { EUR: 0.92 };
    vi.useFakeTimers();
    setCachedRates('USD', rates);
    
    // Advance 6 minutes (TTL is 5 mins)
    vi.advanceTimersByTime(6 * 60 * 1000);
    
    expect(getCachedRates('USD')).toBeNull();
    vi.useRealTimers();
  });

  it('should return null if not in cache', () => {
    expect(getCachedRates('GBP')).toBeNull();
  });
});
