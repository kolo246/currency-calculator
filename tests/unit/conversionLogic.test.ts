import { describe, it, expect } from 'vitest';
import { parseAmount } from '../../src/utils/formatters';

describe('Conversion Logic Utils', () => {
  it('should parse valid amounts correctly', () => {
    expect(parseAmount('100')).toBe(100);
    expect(parseAmount('10.50')).toBe(10.5);
    expect(parseAmount('0.99')).toBe(0.99);
  });

  it('should return 0 for invalid amounts', () => {
    expect(parseAmount('abc')).toBe(0);
    expect(parseAmount('')).toBe(0);
    expect(parseAmount('-10')).toBe(0);
  });
});
