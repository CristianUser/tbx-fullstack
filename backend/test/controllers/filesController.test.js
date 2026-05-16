import { expect } from 'chai';
import sinon from 'sinon';
import { getFilesData } from '../../controllers/filesController.js';
import echoService from '../../services/echo.js';

describe('Files Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      query: {}
    };
    res = {
      json: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis()
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getFilesData', () => {
    it('should return processed files data successfully', async () => {
      // Mock echoService responses
      sinon.stub(echoService, 'listFiles').resolves({ files: ['test1.csv'] });
      sinon.stub(echoService, 'getFileByName').resolves('file,text,number,hex\ntest1.csv,hello,123,40cc0f0fe8820f5ff092736f19f71e3c');

      await getFilesData(req, res);

      expect(res.json.calledOnce).to.be.true;
      const responseData = res.json.getCall(0).args[0];
      
      expect(responseData).to.be.an('array');
      expect(responseData[0].file).to.equal('test1.csv');
      expect(responseData[0].lines).to.have.lengthOf(1);
      expect(responseData[0].lines[0].text).to.equal('hello');
    });

    it('should handle errors and return 500 status', async () => {
      sinon.stub(echoService, 'listFiles').rejects(new Error('API Error'));

      await getFilesData(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.getCall(0).args[0]).to.have.property('error', 'API Error');
    });

    it('should filter invalid lines in the processed data', async () => {
      sinon.stub(echoService, 'listFiles').resolves({ files: ['test1.csv'] });
      // Second line has invalid hex length
      sinon.stub(echoService, 'getFileByName').resolves(
        'file,text,number,hex\ntest1.csv,hello,123,40cc0f0fe8820f5ff092736f19f71e3c\ntest1.csv,world,456,invalidhex'
      );

      await getFilesData(req, res);

      const responseData = res.json.getCall(0).args[0];
      expect(responseData[0].lines).to.have.lengthOf(1);
      expect(responseData[0].lines[0].text).to.equal('hello');
    });

    it('should return data for a specific file when fileName query param is provided', async () => {
      req.query = { fileName: 'test2.csv' };
      sinon.stub(echoService, 'getFileByName').resolves('file,text,number,hex\ntest2.csv,filtered,999,40cc0f0fe8820f5ff092736f19f71e3c');
      const listFilesStub = sinon.stub(echoService, 'listFiles');

      await getFilesData(req, res);

      expect(listFilesStub.called).to.be.false;
      expect(res.json.calledOnce).to.be.true;
      const responseData = res.json.getCall(0).args[0];
      expect(responseData).to.have.lengthOf(1);
      expect(responseData[0].file).to.equal('test2.csv');
      expect(responseData[0].lines[0].text).to.equal('filtered');
    });
  });
});
