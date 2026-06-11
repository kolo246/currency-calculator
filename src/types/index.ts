export interface ConversionRequest {
  from: string;
  to: string;
  amount: number;
}

export interface ExchangeRateAPIResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  isMock?: boolean;
  'error-type'?: string;
}

export interface CachedRates {
  rates: Record<string, number>;
  timestamp: number;
  base: string;
}

export interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  result: number;
  rate: number;
  timestamp: number;
}
