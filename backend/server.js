import express from 'express';
import cors from 'cors';
import echoService from './services/echo.js';
import { parseCsv } from './utils/csv.js';
import { isHex, isNumber } from './utils/validation.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ message: 'Server is running' });
});

const validateCsvLine = (line) => {
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

app.get('/files/data', async (_req, res) => {
  try {
    const { files } = await echoService.listFiles();
    const filesData = await Promise.all(files.map(async (file) => {
      const data = await echoService.getFileByName(file);

      return { file, lines: parseCsv(data, { skipColumnIndexes: [0], skipRowsWithInvalidValues: true, validator: validateCsvLine }) };
    }));
    res.json(filesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
