# Mini Task Tracker (Angular + PrimeNG)

Single-page app to manage tasks with a Node/Express backend.

## Prerequisites

- Node.js 18+
- npm 9+

## How to run (development)

Open two terminals in the project root.

1) Backend (Express)

PowerShell:
```powershell
cd backend
npm install
npm run dev
```
Backend will run on `http://localhost:3000`.

2) Frontend (Angular)

PowerShell:
```powershell
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:4200`.

Proxy config forwards `/api/*` to the backend (`http://localhost:3000`). No extra setup needed.

## Available scripts

Frontend:
```bash
npm start         # ng serve with proxy
npm run build     # production build
```

Backend:
```bash
npm run dev       # nodemon index.js
npm start         # node index.js
```

## Notes

- Data is stored in-memory on the backend and resets on server restart.
- If port 4200 is busy, Angular CLI will prompt to use another port, or run: `npm start -- --port 4201`.
