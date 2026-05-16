/**
 * Checks if a value is a valid hex string.
 * @param {string} value The value to check.
 * @returns {boolean} True if the value is a valid hex string, false otherwise.
 */
export const isHex = (value) => /^[0-9a-fA-F]+$/.test(value);

/**
 * Checks if a value is a valid number.
 * @param {string} value The value to check.
 * @returns {boolean} True if the value is a valid number, false otherwise.
 */
export const isNumber = (value) => !Number.isNaN(Number(value));
