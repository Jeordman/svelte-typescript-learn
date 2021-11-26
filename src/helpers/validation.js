export function isEmpty(value) {
  return value?.trim()?.length === 0;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}