# ⚡ TODOVault — Modern & Secure Task Management Workspace

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

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

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/masihcodes/TODO-Vault.git
cd TODO-Vault
```
