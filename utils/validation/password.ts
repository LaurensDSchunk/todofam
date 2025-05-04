/*
 * Passowrd Validation Requirements:
 * 1. Minimum 8 characters
 * 2. Maximum 64 characters
 * 3. One or more upper-case characters
 * 4. One or more lower-case characters
 * 5. One or more number characters
 * 6. One or more special characters
 * 7. Consist of only letters, numbers, or special characters
 */

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[] | null;
} {
  const errors: string[] = [];

  // Requirement 1: 8+ chars long
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  // Requirement 2: 64- chars long
  if (password.length > 64) {
    errors.push("Password must be at most 64 characters long.");
  }

  // Requirement 3: 1+ upper-case letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must include an upper-case letter.");
  }

  // Requirement 4: 1+ lower-case letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must include a lower-case letter.");
  }

  // Requirement 5: 1+ number character
  if (!/\d/.test(password)) {
    errors.push("Password must include a number.");
  }

  // Requirement 6: 1+ special character
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]/.test(password)) {
    errors.push("Password must include at least one special character.");
  }

  // Requirement 7: No invalid characters
  if (/[^a-zA-Z0-9!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]/.test(password)) {
    errors.push("Password contains invalid character(s).");
  }

  return errors.length === 0
    ? { valid: true, errors: null }
    : { valid: false, errors: errors };
}
