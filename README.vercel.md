# Deploying to Vercel

This document explains how to deploy the Currency Converter API to Vercel.

## Changes Made for Vercel Deployment

1. **Created a Vercel entry point**: `api/index.ts` - This file exports a handler function that Vercel requires for serverless functions.

2. **Updated `vercel.json`**: Configured to use the new entry point with the correct build settings.

## How It Works

- Vercel looks for the `api/index.ts` file as defined in `vercel.json`
- The handler function in `api/index.ts` receives incoming requests and passes them to your Express app
- CORS headers are set to allow cross-origin requests
- The Express app handles routing as usual

## Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically detect the `vercel.json` configuration
4. Set the required environment variables in Vercel dashboard:
   - `CURRENCY_API_KEY` - Your currency API key
   - `CURRENCY_API_BASE_URL` - Base URL for the currency API
5. Deploy!

## Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `CURRENCY_API_KEY` - Your API key for the currency service
- `CURRENCY_API_BASE_URL` - The base URL for the currency API (e.g., https://api.currencyapi.com/v3)

## Local Development

For local development, you can still use:
```bash
npm run dev
```

This will use the traditional Express server approach defined in `src/server.ts`.

## API Endpoints

Once deployed, your API will be available at:

- `GET /api/currency/currencies` - Get list of currencies
- `POST /api/currency/convert` - Convert currency
- `GET /api/currency/history` - Get conversion history
- `GET /health` - Health check endpoint

## Troubleshooting

If you encounter issues:

1. Check that all environment variables are set correctly in Vercel
2. Verify that your `vercel.json` file is in the root directory
3. Ensure that the `api/index.ts` file exists
4. Check the Vercel logs for detailed error messages