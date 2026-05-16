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

/**
 * Validates a CSV line based on specific criteria.
 * @param {Object} line The CSV line to validate.
 * @returns {boolean} True if the line is valid, false otherwise.
 */
export const validateCsvLine = (line) => {
  const requiredFields = ['text', 'number', 'hex'];

  // Check if all required fields are present
  if (!requiredFields.every((field) => line[field] !== '')){
    return false
  }
  // Check if number is a valid number
  if (!isNumber(line.number)) {
    return false
  }
  // Check if hex is a valid hex (32 characters)
  if (!isHex(line.hex) || line.hex.length !== 32) {
    return false
  }
  // Check if text is a valid text (not empty)
  if (line.text.trim().length === 0) {
    return false
  }
  return true;
};
