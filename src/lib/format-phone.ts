export const KZ_PHONE_DIGITS = 10;

/** Renders up to 10 raw digits as "+7 (XXX)XXX-XX-XX", filling in as the user types. */
export function formatKzPhoneDisplay(digits: string): string {
  const d1 = digits.slice(0, 3);
  const d2 = digits.slice(3, 6);
  const d3 = digits.slice(6, 8);
  const d4 = digits.slice(8, 10);

  let out = `+7 (${d1}`;
  if (digits.length >= 3) out += ")";
  out += d2;
  if (digits.length > 6) out += `-${d3}`;
  if (digits.length > 8) out += `-${d4}`;
  return out;
}

/** Extracts the up-to-10 user-entered digits from the masked input's current value. */
export function parseKzPhoneInput(rawValue: string): string {
  const allDigits = rawValue.replace(/\D/g, "");
  // The fixed "+7 " prefix always contributes one leading "7" — drop it.
  return allDigits.slice(1, 1 + KZ_PHONE_DIGITS);
}
