"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversionHistory = exports.convertCurrency = exports.getCurrencyList = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let conversionHistory = [];
const getCurrencyList = async (req, res) => {
    try {
        const response = await axios_1.default.get(`${process.env.CURRENCY_API_BASE_URL}/currencies`, {
            headers: {
                'apikey': process.env.CURRENCY_API_KEY
            }
        });
        const currencies = response.data;
        res.status(200).json(currencies);
    }
    catch (error) {
        console.error('Error fetching currency list:', error.message);
        res.status(500).json({ error: 'Failed to fetch currency list' });
    }
};
exports.getCurrencyList = getCurrencyList;
const convertCurrency = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        if (!from || !to || !amount) {
            return res.status(400).json({ error: 'Missing required parameters: from, to, amount' });
        }
        const response = await axios_1.default.get(`${process.env.CURRENCY_API_BASE_URL}/latest`, {
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
        const conversionRecord = {
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
    }
    catch (error) {
        console.error('Error converting currency:', error.message);
        res.status(500).json({ error: 'Failed to convert currency' });
    }
};
exports.convertCurrency = convertCurrency;
const getConversionHistory = (req, res) => {
    try {
        res.status(200).json(conversionHistory);
    }
    catch (error) {
        console.error('Error fetching conversion history:', error.message);
        res.status(500).json({ error: 'Failed to fetch conversion history' });
    }
};
exports.getConversionHistory = getConversionHistory;
//# sourceMappingURL=currencyController.js.map