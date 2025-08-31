# ResilioSim

ResilioSim is a disaster preparedness, simulation, and response platform for schools, colleges, and communities. It features immersive AR/VR drills, AI guidance, IoT-powered early warnings, and emergency management tools.

## Project Structure

```
ResilioSim/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   ├── Createdb/
│   ├── db/
│   ├── middlewares/
│   ├── routes/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── ...
└── README.md
```

## Features

- **Frontend (React + Vite)**
  - Modern UI with Tailwind CSS
  - User authentication (login/signup)
  - Emergency dashboard and reporting
  - AI chatbot for disaster guidance
  - Alerts feed and resource tracking

- **Backend (Express + MongoDB)**
  - REST API for user and admin management
  - JWT authentication and token blacklisting
  - Emergency report handling
  - Secure password hashing
  - CORS configuration for frontend integration

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- npm

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/yourusername/ResilioSim.git
cd ResilioSim
```

#### 2. Backend Setup

```sh
cd backend
npm install
# Configure .env with your MongoDB URI and secrets
npm start
```

#### 3. Frontend Setup

```sh
cd frontend
npm install
# Configure .env with your backend API URL
npm run dev
```

### Environment Variables

- **backend/.env**: Set `PORT`, `DB_CONNECTION`, `JWT_SECRET`, and cloudinary/admin keys.
- **frontend/.env**: Set `VITE_BASE_URL` to your backend API (e.g., `http://localhost:4000`).

### Usage

- Visit the frontend at [http://localhost:5173](http://localhost:5173)
- API runs at [http://localhost:4000](http://localhost:4000)
- Register/login as a user to access the dashboard and report emergencies.

## Scripts

### Backend

- `npm start` — Start the Express server

### Frontend

- `npm run dev` — Start Vite development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router, React Toastify
- **Backend:** Express, MongoDB, Mongoose, JWT, bcrypt, dotenv, cookie-parser

## License

MIT

---

*Made by Team Apex for BitNBuild Hackathon*
