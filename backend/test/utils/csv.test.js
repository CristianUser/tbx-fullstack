import { expect } from 'chai';
import { parseCsv } from '../../utils/csv.js';

describe('CSV Utils', () => {
  describe('parseCsv', () => {
    const csvContent = 'file,text,number,hex\ntest.csv,hello,123,abc\ntest.csv,world,456,def';

    it('should parse CSV content into an array of objects', () => {
      const result = parseCsv(csvContent);
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.deep.equal({
        file: 'test.csv',
        text: 'hello',
        number: '123',
        hex: 'abc'
      });
    });

    it('should skip specified columns', () => {
      const result = parseCsv(csvContent, { skipColumns: ['file'] });
      expect(result[0]).to.not.have.property('file');
      expect(result[0]).to.have.property('text', 'hello');
    });

    it('should filter invalid rows using validator', () => {
      const validator = (row) => row.number === '456';
      const result = parseCsv(csvContent, { 
        skipInvalidRows: true, 
        validator 
      });
      expect(result).to.have.lengthOf(1);
      expect(result[0].number).to.equal('456');
    });

    it('should handle empty CSV content', () => {
      const emptyCsv = 'file,text,number,hex';
      const result = parseCsv(emptyCsv);
      expect(result).to.be.an('array');
      // Current implementation returns [ {} ] or similar if there's no data line? 
      // Actually split('\n') on one line gives ['header'], then slice(1) gives []
      expect(result).to.have.lengthOf(0);
    });
  });
});
