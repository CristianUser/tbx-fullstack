import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ message: 'Server is running' });
});

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
