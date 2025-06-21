# 🏨 StayFinder – Full Stack Booking Platform

**StayFinder** is a **MERN stack** (MongoDB, Express.js, React, Node.js) web application that allows users to search for stays, view property listings, make bookings, and manage their reservations. It also includes **host functionality** for property owners to list and manage their properties.

---

## 🌐 Live Demo

- **Frontend**: [https://stayfinder-frontend-git-main-santhoshs-projects-e9e8991d.vercel.app](https://stayfinder-frontend-git-main-santhoshs-projects-e9e8991d.vercel.app)
- **Backend API**: [https://stayfinderbackend-production.up.railway.app](stayfinderbackend-production.up.railway.app)
- **overview video**: [https://drive.google.com/file/d/1WrGRgFA1oXr-U_wQLWwjEXazEE4_L9I1/view?usp=drive_link](https://drive.google.com/file/d/1WrGRgFA1oXr-U_wQLWwjEXazEE4_L9I1/view?usp=drive_link)
---

## 🔑 Features

### 👤 User Features

- 🔍 Search stays by location, date range, and guest count  
- 📄 View listings with images, descriptions, and pricing  
- 📅 Book stays by selecting check-in/check-out dates and number of guests  
- 📜 View booking history to track past & upcoming reservations  
- 💬 Submit and view user reviews and ratings for listings  
- 🔐 User authentication (Login/Register with email & password)  

### 🏠 Host Features

- ➕ Add new listings with images, location, availability, and price  
- 📝 Edit or delete existing listings  
- 📅 Manage availability and pricing for each listing  
- 📊 View bookings made by users for their hosted properties  

---

## 🛠️ Tech Stack

| Layer      | Tech                                     |
|------------|------------------------------------------|
| **Frontend** | React (Vite), Axios, React Router        |
| **Backend**  | Node.js, Express.js                      |
| **Database** | MongoDB (local for dev, cloud on Railway)|
| **Deployment** | Railway (backend), Vercel (frontend)     |


---

### 🔌 API Endpoints (Backend)

| Method | Endpoint                   | Description                                 |
|--------|----------------------------|---------------------------------------------|
| POST   | `/register`                | User registration                           |
| POST   | `/login`                   | User login                                  |
| GET    | `/profile`                 | Get the logged-in user's profile            |
| POST   | `/listings`                | Create a new listing                        |
| GET    | `/listings`                | Get all listings                            |
| GET    | `/listings/:id`            | Get a listing by ID                         |
| PUT    | `/listings/:id`            | Update a listing by ID                      |
| DELETE | `/listings/:id`            | Delete a listing by ID                      |
| POST   | `/bookings`                | Create a booking                            |
| GET    | `/bookings`                | Get all bookings                            |
| GET    | `/host/listings`           | Get listings created by the logged-in host  |
| GET    | `/host/bookings`           | Get bookings for listings by the host       |

---

### 🔐 Protected Routes

- `/profile`, `/host/listings`, and `/host/bookings` require `authMiddleware`.
- `/host/*` routes also require `hostOnly` middleware.

---
