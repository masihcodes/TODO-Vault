# ⚡ TODOVault — Modern & Secure Task Management Workspace

<div align="left">
  <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black" alt="Neon Postgres" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

**TODOVault** is a full-stack, decoupled web application designed to help users manage their daily tasks and productivity in a highly secure, lightning-fast environment. Built with modern engineering standards, it features **Role-Based Access Control (RBAC)**, **HTTP-Only Cookie authentication**, and **optimistic UI updates**.

---

## ✨ Key Highlights & Features

- 🛡️ **Bulletproof Security:** Implements JWT access and refresh tokens stored strictly in **HTTP-Only, Secure Cookies** to prevent XSS attacks.
- 🔐 **Role-Based Access Control (RBAC):** Built-in support for `Admin` and `User` roles with middleware-level authorization.
- ⚡ **Zero-Reload State & Cache:** Powered by **TanStack Query (React Query v5)** for automatic cache validation, instant sorting, and optimistic UI transitions.
- 🗄️ **Row-Level Ownership:** Database queries in Drizzle ORM strictly isolate user data—users can only view, modify, or delete their own tasks.
- 💎 **Dark Modern UI:** Styled with **Tailwind CSS**, featuring custom modals, smooth animations, and gamified quest-style task tracking.
- 🧩 **Strict Validation:** End-to-end data validation using **Zod** on both the Express API and frontend request payloads.

---

### LIVE AT: https://todo-vault.vercel.app/

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework:** React (Vite) + TypeScript
- **State Management:** Zustand (Global UI & Modal State)
- **Data Fetching & Caching:** TanStack Query v5 + Axios
- **Styling & Icons:** Tailwind CSS + Lucide React
- **Routing:** React Router DOM v6 (with Protected Route Guards)

### **Backend**

- **Runtime & Framework:** Node.js + Express.js + TypeScript
- **Database:** PostgreSQL (Hosted on Neon Serverless)
- **ORM:** Drizzle ORM
- **Validation & Security:** Zod, Bcrypt, JSON Web Tokens (JWT), Cookie-Parser

---

## 🏛️ Architecture & Engineering Practices

1. **Decoupled Client-Server:** Clean separation of concerns between the frontend Vite app and the backend API, easily deployable as independent micro-services or within a Monorepo.
2. **Dynamic Safe Sorting:** Implemented server-side sorting (by Date, Name, Status, and ID) using strict whitelisting patterns to prevent SQL injection.
3. **Optimized Auth Guard:** Custom `<ProtectedRoute />` component verifying active user sessions seamlessly without triggering unnecessary UI flickers or component re-render loops.

---

## 🛠️ Quick Start & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/masihcodes/TODO-Vault.git
cd TODO-Vault
npm install
```

### 2. Configure Environment Variables
Create a .env.local file in the root directory and add your Neon Serverless Postgres connection string:
```bash
DATABASE_URL="postgresql://user:password@ep-silent-shadow-a2xxxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Run Database Migrations / Push Schema
```bash
npx drizzle-kit migrate
npx drizzle-kit push
```

### 4. Start the App
```bash
npm run dev
```

###  📁 Complete Project Architecture & File Structure

```bash
├── TODOs-Back/                       # Node.js + Express REST API Server
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.ts     # Handlers for Register, Login, Logout, and Profile retrieval
│   │   │   └── todosController.ts    # Handlers for Task CRUD operations with Row-Level Ownership
│   │   ├── db/
│   │   │   ├── db.ts                 # Drizzle ORM serverless connection to Neon PostgreSQL
│   │   │   └── schema.ts             # Relational database models (Users, Todos, and Enums)
│   │   ├── middlewares/
│   │   │   ├── authenticate.ts       # JWT Access Token verification cookie parser
│   │   │   ├── errorHandler.ts       # Global Express error interceptor and formatter
│   │   │   ├── notFound.ts           # 404 Route Not Found fallback handler
│   │   │   ├── refresh.ts            # Refresh Token rotation and session renewal logic
│   │   │   └── validateBodyZod.ts    # Higher-order Zod schema runtime validation middleware
│   │   ├── routes/
│   │   │   ├── authRouter.ts         # Authentication endpoints (/register, /login, /logout, /me)
│   │   │   └── todosRoute.ts         # Protected Task CRUD endpoints (/todos)
│   │   ├── types/
│   │   │   ├── index.ts              # TypeScript backend interfaces (User, TODOs)
│   │   │   └── types.d.ts            # Express Request namespace augmentation for authenticated users
│   │   ├── utils/
│   │   │   └── tokenHelper.ts        # JWT generation and HTTP-Only cookie injection utilities
│   │   ├── zosSchema/
│   │   │   └── index.ts              # Strict Zod validation schemas for Auth and Task payloads
│   │   └── app.ts                    # Express application setup, CORS configuration, and server launch
│   ├── drizzle.config.ts             # Drizzle Kit migration and database tooling configuration
│   ├── package.json                  # Backend dependencies and npm scripts
│   └── tsconfig.json                 # Backend TypeScript compiler rules
│
└── TODOs-Front/                      # React (Vite) + TypeScript Client Application
    ├── src/
    │   ├── API/
    │   │   ├── useAuthQueries.ts     # TanStack Query mutations for Register, Login, and Logout
    │   │   └── useTODOQueries.ts     # TanStack Query hooks for task fetching and CRUD mutations
    │   ├── Components/
    │   │   ├── Footer.tsx            # Sticky responsive application footer
    │   │   ├── Navbar.tsx            # Navigation bar with user role badges and logout triggers
    │   │   ├── ProtectedRoute.tsx    # Route guard verifying sessions via /api/auth/me
    │   │   └── ToDoRows.tsx          # Individual task row UI with edit/delete triggers
    │   ├── Modals/
    │   │   ├── AddModal.tsx          # Gamified "New Quest" creation dialog
    │   │   ├── DeleteModal.tsx       # "Abandon Ship" task deletion confirmation modal
    │   │   ├── EditModal.tsx         # "Tactical Adjustment" inline task editing modal
    │   │   ├── SignInModals.tsx      # Secure user login modal
    │   │   └── SignUpModal.tsx       # User registration modal
    │   ├── Pages/
    │   │   ├── Home.tsx              # Landing page introducing the secure vault
    │   │   └── ToDo.tsx              # Main dashboard featuring sorting controls and active task lists
    │   ├── Utils/
    │   │   ├── myTypes.ts            # Frontend TypeScript interfaces for tasks, users, and store states
    │   │   └── useTODOStore.ts       # Zustand store managing UI modals, active targets, and user sessions
    │   ├── App.tsx                   # Root React component featuring TanStack Query Provider and Router
    │   └── main.tsx                  # Application entry point with React Router DOM wrapper
    ├── package.json                  # Frontend dependencies and npm scripts
    ├── tsconfig.json                 # Frontend TypeScript compiler rules
    └── vite.config.ts                # Vite bundler configuration and Tailwind CSS integration
```
