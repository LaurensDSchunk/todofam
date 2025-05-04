/*
 * Sanitizes a name to remove repeating spaces, "-"s, or "'"s
 * it also cuts out starting or ending whitespace
 */

export function sanitizeName(name: string): string {
  return name
    .trim()
    .replace(/[\s]+/g, " ") // Collapse multiple spaces
    .replace(/[-]+/g, "-") // Collapse multiple hyphens
    .replace(/[']+/g, "'"); // Collapse multiple apostrophes
}
