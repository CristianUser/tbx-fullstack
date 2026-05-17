import echoService from '../services/echo.js';
import { parseCsv } from '../utils/csv.js';
import { validateCsvLine } from '../utils/validation.js';

/**
 * Endpoint to get all files data or filtered by fileName param
 * @param {*} req 
 * @param {*} res 
 */
const getFilesData = async (req, res) => {
  try {
    const fileNameParam = req.query.fileName
    let filesToProcess = []

    if (fileNameParam) {
      filesToProcess.push(fileNameParam)
    } else {
      const { files } = await echoService.listFiles();
      filesToProcess = files
    }

    const filesData = await Promise.all(filesToProcess.map(async (file) => {
      const data = await echoService.getFileByName(file);

      return { 
        file, 
        lines: parseCsv(data, { 
          skipColumns: ['file'], 
          skipInvalidRows: true, 
          validator: validateCsvLine
        }) 
      };
    }));
    res.json(filesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const { files } = await echoService.listFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getFilesData, getFiles }
