# 🧑‍💼 Employee Management System

A full-stack Employee Management System built with **React**, **Redux**, **Node.js**, **Express**, **MongoDB**, **GraphQL**, and **Redis**. The application is containerized using **Docker** for easy setup and deployment.

## 🛠️ Tech Stack

### Frontend
- React.js (with Vite)
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- GraphQL (Apollo Server)
- MongoDB (Mongoose)
- Redis (for caching)

### DevOps
- Docker & Docker Compose

---

## 🚀 Features

- 🔐 Role-Based Authentication (Admin & Employee)
- 📋 CRUD operations for Employee records
- 🔎 Search, Pagination & Sorting
- 🧠 Caching with Redis for optimized performance
- 📦 Containerized with Docker for local and cloud deployments
- 📊 Dashboard to visualize employee stats (optional chart integration)
- 🔁 Real-time updates via GraphQL subscriptions (optional)

---

## 📁 Folder Structure
root/
├── client/ # React frontend
│ ├── src/
│ ├── public/
│ └── vite.config.js
├── server/ # Node.js backend
│ ├── models/
│ ├── resolvers/
│ ├── schema/
│ ├── redis/
│ └── index.js
├── .env
├── docker-compose.yml
├── Dockerfile
└── README.md


---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/employee-management.git
cd employee-management



MONGO_URI=mongodb://mongodb:27017/employees
REDIS_URL=redis://redis:6379
PORT=3000
docker-compose up --build

query {
  getEmployees(page: 1, limit: 10, search: "", sortBy: "name") {
    id
    name
    email
    department
    age
  }
}
mutation {
  addEmployee(input: {
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    department: "Engineering"
  }) {
    id
  }
}


services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  redis:
    image: redis
    ports:
      - "6379:6379"

  backend:
    build: ./server
    ports:
      - "4000:4000"
    depends_on:
      - mongodb
      - redis

  frontend:
    build: ./client
    ports:
      - "5173:5173"
    depends_on:
      - backend
