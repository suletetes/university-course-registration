<div align="center">

  <h1>
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2E86C1&center=true&vCenter=true&width=640&lines=University+Course+Registration+System;Full+Stack+Application;Built+with+MERN+Stack" alt="Typing SVG" />
  </h1>

  <p>
    <b>A streamlined platform for managing university course registration.</b>
  </p>

  <p>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/license-ISC-blue?style=for-the-badge" alt="License" />
  </p>

  <br />

  <!-- Placeholder for App Demo/Screenshot -->
  <img src="/Screenshot 2026-02-03 162925.png" alt="App Screenshot" width="800" />

  <br />
</div>

<br />

## 📖 Project Overview

**University Course Registration System** is a full-stack solution for managing student registration, course catalogs, and administrative oversight. It provides a clean experience for students to browse courses by level, register within credit limits, and view their registered courses, while giving admins tools to manage courses and monitor activity.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🔐 Role-Based Access** | Secure authentication for Students and Admins using JWT. |
| **📚 Course Catalog** | Browse courses by level, with optional carry-over inclusion. |
| **✅ Registration Workflow** | Register courses with validation and a 36-unit max limit. |
| **📄 Registered Courses View** | Clear summary tables for enrolled courses. |
| **📊 Admin Dashboard** | Overview stats and management tools for courses and users. |
| **🎨 Modern UI/UX** | Responsive interface built with Tailwind CSS. |

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)

</div>

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

*   **Node.js** (v18 or higher)
*   **npm** or **yarn**
*   **MongoDB** (Local instance or Atlas URI)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/university-course-reg.git
cd university-course-reg
```

#### 2. Backend Setup
Navigate to the server directory and install dependencies.
```bash
cd server
npm install
```

Create a `.env` file in the `server/` root and configure the following:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/course_reg_db
JWT_SECRET=your_super_secure_jwt_secret
```

Start the server (with seeding optional):
```bash
# Seed the database (optional: clears data and adds defaults)
npm run seed

# Start development server
npm run dev
```

#### 3. Frontend Setup
Open a new terminal tab and navigate to the client directory.
```bash
cd client
npm install
```

Start the React development server:
```bash
npm run dev
```

🚀 **The app should now be running at** `http://localhost:5173`

---

## 📂 Project Structure

```bash
/
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── hooks/       # Client data and state hooks
│   │   ├── pages/       # Application Routes/Views
│   │   └── ...
├── server/              # Node.js Backend
│   ├── controllers/     # Route Logic
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   └── ...
├── package.json         # Root dependencies
└── README.md            # You are here
```

---

## 🔌 API Overview

Base URL: `http://localhost:5000/api`

### Auth

- `POST /auth/signup`
- `POST /auth/login`

### Courses

- `GET /courses/all?level=100&includeLevels=200,300`
- `POST /courses/register`
- `GET /courses/registered`

### Admin

- `GET /admin/stats`
- `GET /admin/students`
- `GET /admin/courses`
- `POST /admin/courses`

---

## 🧪 Scripts

From `server/package.json`:

- Seed courses:
  ```bash
  cd server
  npm run seed
  ```
  Uses `server/scripts/seedDatabase.js`.

- Seed test users:
  ```bash
  cd server
  npm run seed:users
  ```
  Uses `server/scripts/seedUsers.js`.

- Admin API smoke tests:
  ```bash
  cd server
  npm run test:admin
  npm run test:smoke
  ```
  Uses `server/scripts/testAdminEndpoints.js` and `server/scripts/testSmokeEndpoints.js`.
  Requires `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optional `ADMIN_TEST_BASE_URL` in `server/.env.test`.

---

## 📝 Notes

- Course registration enforces a 36-unit maximum on the server.
- Client session data is stored in `sessionStorage` using keys from `client/src/constants/storageKeys.js`.

---

## 📄 License

ISC (see `server/package.json`).
