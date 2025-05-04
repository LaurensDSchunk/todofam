/*
 * Email Requirements:
 * 1. Must fit email form __@__.__
 */

export function validateEmail(email: string): {
  valid: boolean;
  errors: string[] | null;
} {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return isValid
    ? { valid: true, errors: null }
    : { valid: false, errors: ["Invalid email format."] };
}
