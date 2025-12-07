import { describe, test, expect } from 'vitest';

describe('Input validation', () => {
  const isValid = (username: string, password: string) => {
    return username.length > 2 && password.length > 3;
  };

  test('valid inputs pass', () => {
    expect(isValid('sona', '1234')).toBe(true);
  });

  test('invalid short username fails', () => {
    expect(isValid('ab', '1234')).toBe(false);
  });

  test('invalid short password fails', () => {
    expect(isValid('sona', '12')).toBe(false);
  });
});
