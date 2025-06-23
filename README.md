# 🧩 Main App – Micro Frontend Container

This is the main container app built with React and Webpack 5. It uses **Module Federation** to dynamically load the Music Library micro frontend at runtime.

---

## 🚀 Features

- Role-based authentication (Admin/User)
- Dynamically loads `music-library` via Module Federation
- Admin can add and delete songs
- Users can view, filter, sort, and group songs
- Dark-themed responsive UI

---   

## 👥 Login Roles

- **Admin**: Can add and delete songs
- **User**: Can only view and filter songs

To test roles:
- Click **Login as Admin** or **Login as User** on the login screen

---

## 🧰 Tech Stack

- React (Functional Components + Hooks)
- Webpack 5 + Module Federation
- Lazy loading using `React.lazy` + `Suspense`
- LocalStorage for mock authentication (JWT-like)

---

## 📦 Run Locally

Make sure you have the `music-library` project also cloned and running.

1. Clone this repo:
   ```bash
   git clone https://github.com/amansharma6664/main-app.git
   cd main-app
