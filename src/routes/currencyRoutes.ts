import express, { Router } from 'express';
import { getCurrencyList, convertCurrency, getConversionHistory } from '../controllers/currencyController';

const router: Router = express.Router();
router.get('/currencies', getCurrencyList);
router.post('/convert', convertCurrency);
router.get('/history', getConversionHistory);
export default router;