import { describe, it, expect } from 'vitest';
import { isValidEmail } from './validation';

describe('isValidEmail', () => {
  it('should return true for a valid email address', () => {
    const email = 'test@example.com';
    const result = isValidEmail(email);
    expect(result).toBe(true);
  });

  it('should return false for an invalid email address', () => {
    const email = 'not-an-email';
    const result = isValidEmail(email);
    expect(result).toBe(false);
  });

  it('should return false for an empty string', () => {
    const email = '';
    const result = isValidEmail(email);
    expect(result).toBe(false);
  });
});