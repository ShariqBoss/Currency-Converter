import express from 'express';
import { getCurrencyList, convertCurrency, getConversionHistory } from '../controllers/currencyController';
import type { Router } from 'express';

const router: Router = express.Router();
router.get('/currencies', getCurrencyList);
router.post('/convert', convertCurrency);
router.get('/history', getConversionHistory);
export default router;