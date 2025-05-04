/*
 * Email Requirements:
 * 1. Must fit email form __@__.__
 * 2. Must be 254 characters or less
 */

export function validateEmail(email: string): {
  valid: boolean;
  errors: string[] | null;
} {
  const errors: string[] = [];

  if (email.length > 254) {
    errors.push("Email must be 254 characters or less.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Email must be an email.");
  }

  return errors.length === 0
    ? { valid: true, errors: null }
    : { valid: false, errors: errors };
}
