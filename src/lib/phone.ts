/**
 * Normalizes a phone number to digits-only, with leading 7 for Russian numbers.
 * Example: "+7 (903) 123-45-67" → "79031234567"
 * Example: "8 903 123 45 67" → "79031234567"
 */
export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 0) return null;
  // Russian mobile: 11 digits starting with 8 or 7
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return '7' + digits.slice(1);
  }
  // 10 digits — assume Russian without country code
  if (digits.length === 10) {
    return '7' + digits;
  }
  // Return as-is for other formats (international)
  return digits;
}
