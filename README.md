# School Register App

A full-stack school management system for handling courses, students, teachers, attendance, assignments, announcements, and more. Built with a Laravel (PHP) backend and a React + TypeScript + Vite frontend.

---

## Table of Contents

- Features
- Project Structure
- Installation
  - Backend Setup (Laravel)
  - Frontend Setup (React + Vite)
- Usage
- API Documentation
- Development
- License

---

## Features

- User authentication (students, teachers, admin)
- Course, subject, and teacher management
- Student registration and attendance tracking
- Assignments and announcements
- Notes and grades
- Responsive dashboard for different user roles

---

## Project Structure

```
school-register-1/
│
├── Backend/      # Laravel backend (API, migrations, models, controllers)
│
└── Frontend/     # React + TypeScript frontend (SPA)
```

---

## Installation

### Backend Setup (Laravel)

1. **Install dependencies:**
   ```sh
   cd Backend
   composer install
   npm install
   ```

2. **Environment setup:**
   - Copy `.env.example` to `.env` and configure your database and mail settings.

3. **Generate app key:**
   ```sh
   php artisan key:generate
   ```

4. **Run migrations:**
   ```sh
   php artisan migrate
   ```

5. **(Optional) Seed the database:**
   ```sh
   php artisan db:seed
   ```

6. **Start the backend server:**
   ```sh
   php artisan serve
   ```

### Frontend Setup (React + Vite)

1. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```

2. **Environment setup:**
   - Copy `.env.example` to `.env` and set the `VITE_API_URL` to your backend URL.

3. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```

---

## Usage

- Visit the frontend app (usually at `http://localhost:5173`)
- Register or log in as a student, teacher, or admin
- Use the dashboard to manage courses, assignments, attendance, and more

---

## API Documentation

### Authentication

- `POST /api/login` — User login
- `POST /api/register` — User registration
- `POST /api/logout` — User logout

### Courses

- `GET /api/courses` — List all courses
- `POST /api/courses` — Create a new course
- `GET /api/courses/{id}` — Get course details
- `PUT /api/courses/{id}` — Update a course
- `DELETE /api/courses/{id}` — Delete a course

### Assignments

- `GET /api/assignments` — List assignments
- `POST /api/assignments` — Create assignment
- `GET /api/assignments/{id}` — Get assignment details
- `PUT /api/assignments/{id}` — Update assignment
- `DELETE /api/assignments/{id}` — Delete assignment

### Announcements

- `GET /api/announcements` — List announcements
- `POST /api/announcements` — Create announcement

### Attendance

- `GET /api/attendance` — List attendance records
- `POST /api/attendance` — Record attendance

### Notes

- `GET /api/notes` — List notes
- `POST /api/notes` — Create note

> **Note:** For full API details, see the backend routes and controllers in [`Backend/routes`](Backend/routes ) and [`Backend/app/Http/Controllers`](Backend/app/Http/Controllers ).

---

## Development

- **Linting:**  
  - Backend: `php artisan lint`
  - Frontend: `npm run lint`
- **Testing:**  
  - Backend: `php artisan test`
  - Frontend: `npm run test`

---

For more details, see [`Backend/README.md`](Backend/README.md ) and