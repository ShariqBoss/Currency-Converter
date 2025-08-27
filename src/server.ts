import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import currencyRoutes from './routes/currencyRoutes';
import type { Application, Request, Response } from 'express';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/currency', currencyRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Currency Converter API is running' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Currency Converter API is running on port ${PORT}`);
  });
}

export default app;