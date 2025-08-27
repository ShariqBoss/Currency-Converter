export interface CurrencyListResponse {
    data: {
        [key: string]: {
            symbol: string;
            name: string;
            symbol_native: string;
            decimal_digits: number;
            rounding: number;
            code: string;
            name_plural: string;
        };
    };
}
export interface ConversionResponse {
    id: string;
    from: string;
    to: string;
    amount: number;
    convertedAmount: number;
    rate: number;
    timestamp: string;
}
export interface ConversionHistoryItem {
    id: string;
    from: string;
    to: string;
    amount: number;
    convertedAmount: number;
    rate: number;
    timestamp: string;
}