import { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { CurrencyListResponse, ConversionResponse, ConversionHistoryItem } from '../types/currencyTypes';

dotenv.config();

let conversionHistory: ConversionHistoryItem[] = [];


export const getCurrencyList = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.CURRENCY_API_BASE_URL}/currencies`, {
      headers: {
        'apikey': process.env.CURRENCY_API_KEY
      }
    });

    const currencies: CurrencyListResponse = response.data;
    res.status(200).json(currencies);
  } catch (error: any) {
    console.error('Error fetching currency list:', error.message);
    res.status(500).json({ error: 'Failed to fetch currency list' });
  }
};

export const convertCurrency = async (req: Request, res: Response): Promise<any> => {
  try {
    const { from, to, amount } = req.body;
    
    if (!from || !to || !amount) {
      return res.status(400).json({ error: 'Missing required parameters: from, to, amount' });
    }

    const response = await axios.get(`${process.env.CURRENCY_API_BASE_URL}/latest`, {
      params: {
        base_currency: from,
        currencies: to
      },
      headers: {
        'apikey': process.env.CURRENCY_API_KEY
      }
    });

    const rate = response.data.data[to];
    const convertedAmount = amount * rate;
    const conversionRecord: ConversionHistoryItem = {
      id: Date.now().toString(),
      from,
      to,
      amount,
      convertedAmount,
      rate,
      timestamp: new Date().toISOString()
    };
    
    conversionHistory.push(conversionRecord);
    if (conversionHistory.length > 50) {
      conversionHistory = conversionHistory.slice(-50);
    }
    
    res.status(200).json({
      ...conversionRecord,
      rate,
      convertedAmount
    });
  } catch (error: any) {
    console.error('Error converting currency:', error.message);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
};
export const getConversionHistory = (req: Request, res: Response) => {
  try {
    res.status(200).json(conversionHistory);
  } catch (error: any) {
    console.error('Error fetching conversion history:', error.message);
    res.status(500).json({ error: 'Failed to fetch conversion history' });
  }
};