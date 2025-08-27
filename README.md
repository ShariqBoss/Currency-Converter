# Currency Converter Application

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be running on `http://localhost:3000`.

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will be running on `http://localhost:4200`.

## API Endpoints

### Get Available Currencies

```
GET /api/currency/currencies
```

### Convert Currency

```
POST /api/currency/convert
```

Body:
```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100
}
```

### Get Conversion History

```
GET /api/currency/history
```