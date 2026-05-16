import express from 'express';
import cors from 'cors';
import { getFilesData } from './controllers/filesController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/files/data', getFilesData);


const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
