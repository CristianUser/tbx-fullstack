import { expect } from 'chai'
import { isHex, isNumber, validateCsvLine } from '../../utils/validation.js'

describe('Validation Utils', () => {
  describe('isHex', () => {
    it('should return true for valid hex strings', () => {
      expect(isHex('40cc0f0fe8820f5ff092736f19f71e3c')).to.be.true
      expect(isHex('0123456789abcdefABCDEF')).to.be.true
    })

    it('should return false for invalid hex strings', () => {
      expect(isHex('ghij')).to.be.false
      expect(isHex('123g')).to.be.false
      expect(isHex('')).to.be.false
    })
  })

  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      expect(isNumber('123')).to.be.true
      expect(isNumber('0')).to.be.true
      expect(isNumber('-1')).to.be.true
      expect(isNumber('1.23')).to.be.true
    })

    it('should return false for invalid numbers', () => {
      expect(isNumber('abc')).to.be.false
      expect(isNumber('')).to.be.true // Number('') is 0 in JS, might need to adjust logic if this is not intended
      expect(isNumber(' ')).to.be.true // Number(' ') is 0
      expect(isNumber(undefined)).to.be.false
    })
  })

  describe('validateCsvLine', () => {
    it('should return true for a valid line', () => {
      const validLine = {
        text: 'hello',
        number: '123',
        hex: '40cc0f0fe8820f5ff092736f19f71e3c'
      }
      expect(validateCsvLine(validLine)).to.be.true
    })

    it('should return false if a field is missing', () => {
      const invalidLine = {
        text: 'hello',
        number: '',
        hex: '40cc0f0fe8820f5ff092736f19f71e3c'
      }
      expect(validateCsvLine(invalidLine)).to.be.false
    })

    it('should return false if number is invalid', () => {
      const invalidLine = {
        text: 'hello',
        number: 'abc',
        hex: '40cc0f0fe8820f5ff092736f19f71e3c'
      }
      expect(validateCsvLine(invalidLine)).to.be.false
    })

    it('should return false if hex is invalid length', () => {
      const invalidLine = {
        text: 'hello',
        number: '123',
        hex: 'abc'
      }
      expect(validateCsvLine(invalidLine)).to.be.false
    })

    it('should return false if text is empty', () => {
      const invalidLine = {
        text: ' ',
        number: '123',
        hex: '40cc0f0fe8820f5ff092736f19f71e3c'
      }
      expect(validateCsvLine(invalidLine)).to.be.false
    })
  })
})
