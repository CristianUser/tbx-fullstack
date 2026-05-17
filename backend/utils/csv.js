/**
 * Parses a CSV string into an array of objects.
 * @param {string} csv The CSV string to parse.
 * @param {Object} options Optional configuration for parsing.
 * @param {string[]} options.skipColumns Array of header names to be ignored in the output objects.
 * @param {boolean} options.skipInvalidRows Whether to skip rows with any invalid values.
 * @param {function} options.validator Validator function to determine if a row is valid.
 * @returns {Object[]} Array of objects representing the CSV data.
 */
export function parseCsv (csv, options = {}) {
  const { skipColumns = [], skipInvalidRows = false, validator = () => true } = options

  const lines = csv.split('\n')
  const headers = lines[0].split(',')
  const data = lines.slice(1).map((line) => {
    const values = line.split(',')
    const obj = {}
    headers.forEach((header, index) => {
      if (!skipColumns.includes(header)) {
        obj[header] = values[index]
      }
    })
    return obj
  })

  if (skipInvalidRows) {
    return data.filter((line) => validator(line))
  }

  return data
};
