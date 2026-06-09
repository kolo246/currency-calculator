import { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../services/exchangeRateService';
import { getCachedRates, setCachedRates } from '../utils/cache';
import { useDebounce } from './useDebounce';

export const useCurrencyConverter = (amount: number, from: string, to: string) => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedAmount = useDebounce(amount, 300);
  const debouncedFrom = useDebounce(from, 300);

  useEffect(() => {
    const loadRates = async () => {
      const cached = getCachedRates(debouncedFrom);
      if (cached) {
        setRates(cached);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchExchangeRates(debouncedFrom);
        if (data.result === 'success' && data.conversion_rates) {
          setRates(data.conversion_rates);
          setCachedRates(debouncedFrom, data.conversion_rates);
        } else {
          throw new Error(data['error-type'] || 'Invalid API response');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rates');
      } finally {
        setIsLoading(false);
      }
    };

    loadRates();
  }, [debouncedFrom]);

  const result = rates[to] ? debouncedAmount * rates[to] : 0;

  return {
    result,
    isLoading,
    error,
    rates: Object.keys(rates)
  };
};
