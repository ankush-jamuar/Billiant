# ✨ Billiant

**Billiant** is a modern **online invoice and client management platform** built using the **MERN stack**.  
It helps freelancers and small businesses manage clients, create invoices, and control account settings through a clean, intuitive, and production-style dashboard.

---

## 🚀 Features

### 👥 Client Management
- Create, view, and update client information
- Centralized client records
- Easy navigation between clients

### 🧾 Invoice Management
- Generate and manage invoices
- Track invoice status
- Structured workflow for billing

### 📊 Dashboard
- Overview of clients and invoices
- Quick access to key actions
- Minimal and distraction-free UI

### 👤 Profile
- Manage personal account information
- Update profile details separately from system settings

### ⚙️ Settings
- Change password and security preferences
- Manage account-related configurations
- **Danger Zone** for irreversible actions such as account deletion

### 🔐 Authentication & Security
- Secure login and registration
- JWT-based authentication
- Protected routes
- Password confirmation for sensitive actions

---

## 🧠 UX & Product Decisions

- **Global sidebar and topbar** for main application navigation
- **Sidebar removed on Settings pages** to reduce cognitive load
- **Clear separation between Profile and Settings**
- Card-based layout for consistency and scalability
- Destructive actions are visually isolated and require confirmation

These choices align Billiant with real-world SaaS UX standards.

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- react-hot-toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JSON Web Tokens (JWT)

---

## 📁 Project Structure

```text
client/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── settings/
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Clients.jsx
│   │   ├── Invoices.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   │
│   ├── services/
│   │   └── auth.services.js
│   │
│   └── App.jsx
│
server/
├── controllers/
├── models/
├── routes/
└── middleware/

Danger Zone Philosophy

Critical and irreversible actions in Billiant:

Are separated visually from regular settings

Require password confirmation

Display explicit warnings

Prevent accidental triggers

This mirrors best practices used by production SaaS platforms.

🚀 Getting Started
Prerequisites

Node.js

MongoDB

Installation
# Clone the repository
git clone https://github.com/your-username/billiant.git

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Run backend
npm run dev

# Run frontend
npm run dev

🚧 Future Improvements

#Dark mode

#Role-based access control

#Two-factor authentication (2FA)

#Analytics and reporting
