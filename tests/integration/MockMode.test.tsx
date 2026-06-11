import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import CurrencyCalculator from '../../src/components/CurrencyCalculator/CurrencyCalculator';
import { clearCache } from '../../src/utils/cache';

vi.mock('axios');

// We do NOT mock the service here because we want to test the actual fallback logic
// but we need to ensure the environment variables are controlled.

describe('CurrencyCalculator Mock Mode Fallback', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('VITE_EXCHANGE_RATE_API_KEY', 'YOUR_API_KEY'); // Placeholder value
    vi.stubEnv('VITE_USE_MOCK_DATA', 'false');
    clearCache();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should fallback to mock data when API key is the placeholder', async () => {
    render(<CurrencyCalculator />);

    expect(await screen.findByText(/€0.92/i)).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('should fallback to mock data when API key is missing', async () => {
    vi.stubEnv('VITE_EXCHANGE_RATE_API_KEY', '');
    
    render(<CurrencyCalculator />);

    expect(await screen.findByText(/€0.92/i)).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('should use mock data when VITE_USE_MOCK_DATA is true', async () => {
    vi.stubEnv('VITE_EXCHANGE_RATE_API_KEY', 'valid_key');
    vi.stubEnv('VITE_USE_MOCK_DATA', 'true');
    
    render(<CurrencyCalculator />);

    expect(await screen.findByText(/€0.92/i)).toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });
});
