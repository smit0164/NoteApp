# 📝 NoteApp — Full Stack Note Sharing App

A full stack note-taking and sharing application built with **React + Redux Toolkit** on the frontend and **Laravel + Sanctum** on the backend. Users can sign up, log in, create notes (public or private), and delete them from their personal dashboard.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Redux Toolkit, React Router, Tailwind CSS |
| Backend | Laravel, Laravel Sanctum |
| Database | MySQL |
| Auth | Token-based auth via Laravel Sanctum |

---

## ✨ Features

- User registration and login with validation
- Token-based authentication (Laravel Sanctum)
- Create notes with title, content, and public/private visibility
- View all personal notes on a dashboard
- Delete notes
- Frontend form validation with inline error messages
- Loading states and spinner UI feedback

---
## Screenshots
- Login Page
<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/1896e502-6393-46f0-ab65-259736b653e0" />
- Register Page
<img width="1919" height="854" alt="image" src="https://github.com/user-attachments/assets/860ac5be-667a-452b-b984-3c33002502a4" />
- Dashboard Page
<img width="1919" height="877" alt="image" src="https://github.com/user-attachments/assets/1d99f127-395a-42db-afb3-b7efa2704b0f" />
- 
## ⚙️ Backend Setup (Laravel)

### Requirements

- PHP >= 8.1
- Composer
- MySQL

### Steps

```bash
# 1. Go to backend folder
cd Backend/notesAppBackend

# 2. Install dependencies
composer install

# 3. Copy env file and configure it
cp .env.example .env

# 4. Set your database credentials in .env
DB_DATABASE=noteapp
DB_USERNAME=root
DB_PASSWORD=your_password

# 5. Generate app key
php artisan key:generate

# 6. Run migrations
php artisan migrate

# 7. Start server
php artisan serve
```

Backend runs at: `http://localhost:8000`

---

## 🔌 API Endpoints

### Auth (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | Register new user |
| POST | `/api/login` | Login and get token |

### Notes (Protected — requires Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get logged-in user info |
| POST | `/api/createnote` | Create a new note |
| GET | `/api/notes` | Fetch all notes for logged-in user |
| DELETE | `/api/deletenote/{id}` | Delete a note by ID |

> All protected routes require `Authorization: Bearer <token>` header.

---

## 🖥️ Frontend Setup (React)

### Requirements

- Node.js >= 18

### Steps

```bash
# 1. Go to frontend folder
cd frontend/note-sharing-app

# 2. Install dependencies
npm install

# 3. Create a .env file
touch .env
```

Add this to `.env`:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

```bash
# 4. Start the app
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🗺️ Frontend Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Login` | Login page |
| `/signup` | `Signup` | Register page |
| `/dashboard` | `Dashboard` | View and delete notes |
| `/createnote` | `NoteForm` | Create a new note |

---

## 🔐 How Auth Works

1. User signs up or logs in → Laravel returns a **Sanctum token**
2. Token is stored in Redux state (authSlice)
3. All API calls to protected routes include the token in the `Authorization` header
4. On the backend, `auth:sanctum` middleware verifies the token

---

## ✅ Validation

**Frontend:**
- Title: minimum 3 characters
- Content: minimum 10 characters
- Inline error messages shown below each field

**Backend (Laravel):**
- `name`: required, string, max 255
- `email`: required, valid email, unique
- `password`: required, min 6 characters
- Note fields validated via `NoteRequest` form request class

---

## 🗃️ Database

### `users` table

| Column | Type |
|--------|------|
| id | bigint |
| name | string |
| email | string (unique) |
| password | string (hashed) |

### `notes` table

| Column | Type |
|--------|------|
| id | bigint |
| user_id | foreign key → users |
| title | string |
| content | text |
| is_public | boolean (0 = private, 1 = public) |
| created_at | timestamp |

---

## 👤 Author

**Smit** — [github.com/smit0164](https://github.com/smit0164)
