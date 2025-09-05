# Mini-Tracker

SPA for managing tasks with an Express + MongoDB backend and Angular + PrimeNG frontend.

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB running locally (or a connection string)

## Backend (Express + MongoDB)
1) Create `.env` in `backend` with your Mongo URL, for example:
```
MONGODB_URI=mongodb://127.0.0.1:27017/minitracker
```
2) Start the backend:
```powershell
cd backend
npm install
npm run dev
```
- Runs on `http://localhost:3000`

## Frontend (Angular + PrimeNG)
1) Start the frontend:
```powershell
cd frontend
npm install
npm start
```
- Runs on `http://localhost:4200`

2) API access:
- The frontend calls the backend at `/api/*`. If you use a proxy, ensure it's configured to `http://localhost:3000`.

## Scripts
Backend:
```bash
npm run dev    # nodemon server
npm start      # node server
```
Frontend:
```bash
npm start      # angular dev server
npm run build  # production build
```
