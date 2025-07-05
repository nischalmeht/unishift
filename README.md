# Log Ingestion and Filtering System

A full-stack application to ingest, store, and search logs. Built using **React.js** for the frontend and **Node.js + Express** with the MVC architecture on the backend.

---

## 🧩 Features

- Log ingestion via POST API
- Filter/search logs by log level (e.g., `error`, `info`, `warning`) with debounce
- JSON file-based log storage
- Responsive, styled UI with Tailwind CSS
- Follows MVC design pattern in backend
- Reusable Axios setup

---

## 🚀 Tech Stack

### Frontend

- React.js (Vite)
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- File System (fs module)
- MVC architecture

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash[
[git clone [https://github.com/your-username/log-system.git](https://github.com/nischalmeht/expo.git)](https://github.com/nischalmeht/expo.git](https://github.com/nischalmeht/expo.git))
cd log-system

Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

GET Logs (with level filter)
GET /logs?level=error

POST /api/logs

{
  "level": "error",
  "message": "Failed to connect to database",
  "resourceId": "server-1234",
  "timestamp": "2025-07-03T10:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-5678"
  }
}

Folder Structure
/frontend
  ├── src/
  │   └── components/
  │   └── App.jsx
  └── vite.config.js

/backend
  ├── controllers/
  │   └── logController.js
  ├── routes/
  │   └── logRoutes.js
  ├── utils/
  │   └── fileHandler.js
  ├── logs.json
  └── server.js


---

Let me know if you'd like:
- A version with images and GIFs
- Live deployment instructions (e.g., Vercel + Railway/Render)
- To split this into separate `README`s for frontend/backend folders



