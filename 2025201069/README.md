MERN Todo App (Backend + Frontend)

Prerequisites
- Node.js and npm via nvm
- MongoDB running locally (mongod)

Backend (Express + MongoDB)
1. .env
   Create `2025201069/backend/.env` with:
   
   PORT=5001
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/SSD

2. Install & Run
   
   . "$HOME/.nvm/nvm.sh"
   cd 2025201069/backend
   npm install
   npm run dev

   You should see: "Server running on port 5001" and "MongoDB Connected".

Frontend (Vite + React)
1. .env
   Create `2025201069/frontend/.env` with:
   
   VITE_API_BASE_URL=http://localhost:5001

2. Install & Run
   
   . "$HOME/.nvm/nvm.sh"
   cd 2025201069/frontend
   npm install
   npm run dev -- --host

   Open the printed Local URL (e.g., http://localhost:5173/).

Verify
- Add, toggle, delete todos in the UI; data persists in MongoDB.
- Optional API test: curl http://localhost:5001/api/todos