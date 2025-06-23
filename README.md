# 🧩 Main App – Micro Frontend Container

This is the main container app built using **React** and **Webpack 5 Module Federation**. It dynamically loads the Music Library micro frontend at runtime.

---

## 🚀 Features

- Micro Frontend architecture with Module Federation
- Role-based login for Admin and User
- Admin can add and delete songs
- User can view, search, filter, sort, and group songs
- Dark theme with responsive UI
- Songs managed locally using React state and hooks

---

## 👤 Roles & Credentials

| Role   | Username | Password   |
|--------|----------|------------|
| Admin  | `admin`  | `admin123` |
| User   | `user`   | `user123`  |

- 🔒 Admin: Full access (add/delete songs)
- 👀 User: Read-only access (view + filter/sort)

---

## 🧰 Tech Stack

- React (with Hooks)
- Webpack 5 + Module Federation
- React.lazy + Suspense for remote loading
- LocalStorage (mock JWT auth)
- Tailored inline CSS (no external UI library) 

---

## 📦 How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/amansharma6664/main-app.git
   cd main-app
