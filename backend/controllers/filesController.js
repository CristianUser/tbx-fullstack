import echoService from '../services/echo.js';
import { parseCsv } from '../utils/csv.js';
import { validateCsvLine } from '../utils/validation.js';

export const getFilesData = async (_req, res) => {
  try {
    const { files } = await echoService.listFiles();
    const filesData = await Promise.all(files.map(async (file) => {
      const data = await echoService.getFileByName(file);

      return { 
        file, 
        lines: parseCsv(data, { 
          skipColumnIndexes: [0], 
          skipRowsWithInvalidValues: true, 
          validator: validateCsvLine
        }) 
      };
    }));
    res.json(filesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
