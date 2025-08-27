import { Request, Response } from 'express';
export declare const getCurrencyList: (req: Request, res: Response) => Promise<void>;
export declare const convertCurrency: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getConversionHistory: (req: Request, res: Response) => void;
//# sourceMappingURL=currencyController.d.ts.map