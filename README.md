# Person Management System

A full-stack web application for managing people records, built with **React**, **Node.js (Express)**, and **PostgreSQL**, fully containerized using **Docker Compose**.

---

## 🚀 Features

* ➕ Create a new person
* 📋 View all people
* ✏️ Update existing person details
* ❌ Delete a person with confirmation
* ✅ Form validation (frontend + backend)
* 🔒 Unique email constraint
* 🐳 One-command Docker setup

---

## 🏗️ Tech Stack

* **Frontend:** React
* **Backend:** Node.js + Express
* **Database:** PostgreSQL
* **Containerization:** Docker & Docker Compose

---

## 📂 Project Structure

```
.
├── backend/          # Express API
├── frontend/         # React app
├── db/
│   └── init.sql      # Database initialization script
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

---

### 2. Create environment file

Copy the example file:

```bash
cp .env.example .env
```

Edit values if needed.

---

### 3. Run the project with Docker

```bash
docker compose up --build
```

---

### 4. Access the application

* Frontend: http://localhost:3000
* Backend API: http://localhost:3001

---

## 📡 API Endpoints

Base URL: `/api`

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /people     | Get all people    |
| GET    | /people/:id | Get person by ID  |
| POST   | /people     | Create new person |
| PUT    | /people/:id | Update person     |
| DELETE | /people/:id | Delete person     |

---

## 🧪 Validation Rules

### Frontend:

* Full name cannot be empty
* Email must be valid format

### Backend:

* Email must be unique
* Invalid inputs return proper HTTP status codes

---

## 🗄️ Database

The database is automatically initialized using `init.sql`.

### Table: `people`

| Column    | Type   | Constraints      |
| --------- | ------ | ---------------- |
| id        | SERIAL | PRIMARY KEY      |
| full_name | TEXT   | NOT NULL         |
| email     | TEXT   | UNIQUE, NOT NULL |

---

## 🐳 Docker Services

* **frontend** – React app
* **backend** – Express API
* **db** – PostgreSQL database

All services are orchestrated using Docker Compose.

---

## ⚠️ Notes

* `.env` is not included for security reasons
* Use `.env.example` as a template
* Make sure Docker is running before starting the app

---

## 👨‍🎓 Assignment Info

This project was developed as part of a full-stack development assignment, focusing on:

* REST API design
* Full CRUD operations
* Docker-based deployment
* Clean project structure

---

## 🏁 Final Thoughts

This project demonstrates a complete full-stack workflow with containerization, making it easy to deploy and run consistently across environments.

---

## 👤 Author

* Can Eltayeb

---
