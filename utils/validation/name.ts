/*
 * Name Requirements:
 * 1. Minimum 1 character
 * 2. Maximum 50 character
 * 3. Only letters, spaces, "-"s, or "'"s
 * 4. No repeating spaces, "-"s, or "'"s (Sanitized)
 */

export function validateName(name: string): {
  valid: boolean;
  errors: string[] | null;
} {
  const errors: string[] = [];

  // Requirement 1: 1+ chars long
  if (name.length < 1) {
    errors.push("Name must be at least 1 character long");
  }

  // Requirement 2: 50- chars long
  if (name.length > 50) {
    errors.push("Name must be at most 50 characters long.");
  }

  // Requirement 3: only allowed characters
  if (!/^[\p{L}'\- ]+$/u.test(name)) {
    errors.push(
      "Name can only include letters, spaces, hyphens, or apostrophes.",
    );
  }

  return errors.length === 0
    ? { valid: true, errors: null }
    : { valid: false, errors: errors };
}
