import fetch from 'node-fetch';

const API_KEY = process.env.ECHO_SERVICE_API_KEY || 'aSuperSecretKey';
const API_URL = process.env.ECHO_SERVICE_API_URL || 'https://echo-serv.tbxnet.com';

class EchoService {
  /**
   * Retrieves the list of files from the Echo Service.
   * @returns {Promise<Object>} The list of files.
   */
  async listFiles() {
    try {
      const response = await fetch(`${API_URL}/v1/secret/files`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the content of a file by name from the Echo Service.
   * @param {string} name The name of the file to retrieve.
   * @returns {Promise<string>} The content of the file in csv format.
   */
  async getFileByName(name) {
    try {
      const response = await fetch(`${API_URL}/v1/secret/file/${name}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      const data = await response.text();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new EchoService();
