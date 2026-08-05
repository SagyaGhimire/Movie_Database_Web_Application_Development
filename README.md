# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## AI Movie Recommendation UI

This app includes a new AI recommendation experience on the Watchlist page.

Features:

- `Recommend Me Something` button on the Watchlist page
- Styled AI recommendation panel showing 3 suggested movies and reasoning
- Loading spinner while AI results are fetched
- Error handling for recommendation requests

### Usage

1. Log in to the app.
2. Add movies to your watchlist from the Browse page.
3. Open the Watchlist page.
4. Click `Recommend Me Something` to fetch AI recommendations from the backend.

> The backend already handles the prompt: `Based on this user's watchlist and favourite genres, recommend 3 movies from our database they would enjoy, with reasons. Return JSON.`

### Live Preview

The frontend is served with Vite from the nested `frontend` app. To start locally:

```bash
cd frontend/frontend
npm install
npm run dev
```

If a live URL is available after deployment, add it here.

### Screenshots

Add screenshots of the Watchlist page and the AI recommendation panel here once the feature is running.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
