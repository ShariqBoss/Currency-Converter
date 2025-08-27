import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getCurrencyList, convertCurrency, getConversionHistory } from './controllers/currencyController';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/currencies', getCurrencyList);
app.post('/api/convert', convertCurrency);
app.get('/api/history', getConversionHistory);

export default app;
