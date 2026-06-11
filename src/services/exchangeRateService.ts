import axios from 'axios';
import { ExchangeRateAPIResponse } from '../types';
import { getMockRates } from './mockDataService';

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY || 'YOUR_API_KEY'}/latest`;

const isMockMode = (): boolean => {
  return USE_MOCK_DATA || !API_KEY || API_KEY === 'YOUR_API_KEY';
};

export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRateAPIResponse> => {
  if (isMockMode()) {
    console.log(`[ExchangeRateService] Using mock data for ${baseCurrency}`);
    
    // Dynamic import to ensure mock data is code-split from production bundle
    const { getMockRates } = await import('./mockDataService');
    
    return new Promise((resolve) => {
      // Simulate network delay for realistic UI feedback
      setTimeout(() => {
        resolve(getMockRates(baseCurrency));
      }, 300);
    });
  }

  try {
    const response = await axios.get<ExchangeRateAPIResponse>(`${BASE_URL}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.['error-type'] || 'Failed to fetch exchange rates');
    }
    throw new Error('An unexpected error occurred while fetching exchange rates');
  }
};
