import { describe, it, expect } from 'vitest';
import { isValidEmail } from './validation';

// 'describe' groups related tests together into a suite.
describe('isValidEmail', () => {

  // 'it' defines an individual test case. The description should
  // explain what this specific test is verifying.
  it('should return true for a valid email address', () => {
    // A simple, classic "happy path" test.
    const email = 'test@example.com';
    const result = isValidEmail(email);
    // 'expect' is the assertion. We expect the result to be true.
    expect(result).toBe(true);
  });

  it('should return false for an invalid email address', () => {
    // Test a common failure case.
    const email = 'not-an-email';
    const result = isValidEmail(email);
    expect(result).toBe(false);
  });

  it('should return false for an empty string', () => {
    // Test an edge case.
    const email = '';
    const result = isValidEmail(email);
    expect(result).toBe(false);
  });
});