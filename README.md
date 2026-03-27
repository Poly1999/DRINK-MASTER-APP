# 🍹 Drink Master

A fullstack web application for exploring, creating, and managing cocktail recipes. Built with the MERN stack.

![Drink Master](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-18-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)

---

## 🌐 Live Demo

- **Frontend:** [drink-master.vercel.app](https://mydrinkmaster.vercel.app)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)

---

## ✨ Features

- 🔐 **Authentication** — Register, login, logout with JWT
- 🍸 **Browse Cocktails** — Search and filter 400+ cocktail recipes by name, category, and ingredient
- ❤️ **Favorites** — Save cocktails to your personal favorites list
- ➕ **Add Recipes** — Create and publish your own cocktail recipes with photos
- 👤 **Profile** — Update your name and avatar
- 🌙 **Dark / Light Theme** — Toggle between themes
- 📱 **Responsive** — Fully adapted for mobile, tablet, and desktop
- 🔞 **Age Verification** — Alcoholic drinks are hidden for users under 18

---

## 🛠 Tech Stack

### Backend

| Technology         | Description        |
| ------------------ | ------------------ |
| Node.js + Express  | REST API server    |
| MongoDB + Mongoose | Database           |
| JWT                | Authentication     |
| Cloudinary         | Image uploads      |
| Multer             | File handling      |
| Nodemailer         | Email subscription |
| Swagger UI         | API documentation  |

### Frontend

| Technology            | Description          |
| --------------------- | -------------------- |
| React (CRA)           | UI library           |
| Redux Toolkit         | State management     |
| React Router DOM      | Client-side routing  |
| Axios                 | HTTP requests        |
| React Hook Form + Yup | Form validation      |
| React Hot Toast       | Notifications        |
| React DatePicker      | Birthday date picker |

---

## 📁 Project Structure

```
DRINK-MASTER-APP/
├── backend/
│   ├── controllers/        # Route handlers
│   ├── helpers/            # Cloudinary, DB connection
│   ├── middlewares/        # Auth, upload middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── data/               # Seed data (JSON)
│   ├── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/            # Axios instance and API calls
        ├── assets/         # Images, icons
        ├── components/     # Reusable UI components
        ├── hooks/          # Custom hooks
        ├── pages/          # Page components
        └── redux/          # Redux slices and store
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Clone the repository

```bash
git clone https://github.com/Poly1999/DRINK-MASTER-APP.git
cd DRINK-MASTER-APP
```

### Backend setup

```bash
cd backend
npm install
```

Create `.env` file in `/backend`:

```env
PORT
MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Seed the database:

```bash
node helpers/seed.js
```

Run the server:

```bash
npm run dev
```

### Frontend setup

```bash
cd frontend
npm install
```

Create `.env` file in `/frontend`:

```env
REACT_APP_API_URL=https://drink-master-backend-fqjy.onrender.com/api
```

Run the app:

```bash
npm start
```

---

## 🔑 Environment Variables

### Backend

| Variable                | Description                     |
| ----------------------- | ------------------------------- |
| `PORT`                  | Server port (default: 8000)     |
| `MONGO_URI`             | MongoDB Atlas connection string |
| `JWT_SECRET`            | Secret key for JWT signing      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name           |
| `CLOUDINARY_API_KEY`    | Cloudinary API key              |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret           |

### Frontend

| Variable            | Description          |
| ------------------- | -------------------- |
| `REACT_APP_API_URL` | Backend API base URL |

---

## 📖 API Documentation

Full API documentation is available via Swagger UI at `/api-docs` when the server is running.

### Main Endpoints

#### Auth `/api/auth`

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| POST   | `/signup`  | Register a new user |
| POST   | `/signin`  | Login user          |
| POST   | `/signout` | Logout user         |

#### Users `/api/users`

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/current`   | Get current user        |
| PATCH  | `/update`    | Update name and avatar  |
| POST   | `/subscribe` | Subscribe to newsletter |

#### Filters `/api/filters`

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | `/categories`  | Get all categories  |
| GET    | `/ingredients` | Get all ingredients |
| GET    | `/glasses`     | Get all glass types |

#### Drinks `/api/drinks`

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/mainpage`            | Get drinks for home page   |
| GET    | `/popular`             | Get popular drinks         |
| GET    | `/search`              | Search drinks with filters |
| GET    | `/:id`                 | Get drink by ID            |
| GET    | `/own`                 | Get user's own drinks      |
| POST   | `/own/add`             | Add own drink              |
| DELETE | `/own/remove/:id`      | Delete own drink           |
| GET    | `/favorite`            | Get favorite drinks        |
| POST   | `/favorite/add/:id`    | Add to favorites           |
| DELETE | `/favorite/remove/:id` | Remove from favorites      |

---

## 👩‍💻 Author

**Polina Pikalova**

- GitHub: [@Poly1999](https://github.com/Poly1999)
- LinkedIn: [Polina Pikalova](https://www.linkedin.com/in/polina-pikalova-366148375/)

---

## 📄 License

This project is licensed under the MIT License.
