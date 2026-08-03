# Backend README

This folder contains the Express backend for the Movies app.

Setup (local)

1. Copy `.env.example` to `.env` and set your secrets:

```env
GOOGLE_API_KEY=your-google-gemini-api-key
MONGO_URI=your-mongo-connection-string
PORT=3000
```

2. Install dependencies and start the server:

```bash
cd backend
npm install
npm run dev
```

Deploy to Render

- Create a new Web Service on Render and connect your repository.
- In the Render dashboard for your Service, add an Environment Variable named `GOOGLE_API_KEY` with the Gemini API key value.
- Set the `Start Command` to `npm start` (or `npm run dev` for development).
- Ensure the `Build Command` is `npm install` and the `Root Directory` is the `backend` folder if needed.

After deployment, verify:

- The root endpoint `/` returns a 200 OK.
- The AI endpoint `POST /api/ai/recommend` returns JSON when called with a valid authenticated user and watchlist.
