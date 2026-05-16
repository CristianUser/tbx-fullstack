/**
 * Parses a CSV string into an array of objects.
 * @param {string} csv The CSV string to parse.
 * @param {Object} options Optional configuration for parsing.
 * @param {number[]} options.skipColumnIndexes Array of column indexes to skip.
 * @param {boolean} options.skipRowsWithInvalidValues Whether to skip rows with invalid values.
 * @param {function} options.validator Validator function to determine if a row is valid.
 * @returns {Object[]} Array of objects representing the CSV data.
 */
export function parseCsv(csv, options = {}) {
  const { skipColumnIndexes = [], skipRowsWithInvalidValues = false, validator = () => true } = options;

  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const data = lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, index) => {
      if (!skipColumnIndexes.includes(index)) {
        obj[header] = values[index];
      }
    });
    return obj;
  });

  if (skipRowsWithInvalidValues) {
    return data.filter((line) => validator(line));
  }

  return data;
};
