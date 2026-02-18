# Webknox - Full Stack MERN Application

Webknox is a professional Full Stack Development Service Agency website built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Modern UI/UX**: Apple-style minimalist design with smooth animations.
- **Authentication**: Secure JWT-based auth with httpOnly cookies.
- **Protected Routes**: Dashboard access only for logged-in users.
- **Contact Form**: Functional API integration with database storage.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas URI

### 1. Environment Setup

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 3. Run Locally

**Start Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Start Frontend:**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

## Deployment Guide

### Database (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas.
2. Get the connection string (Add your IP to whitelist).
3. Setup the database user.

### Backend (Render/Railway)
1. Push code to GitHub.
2. Link repository to Render/Railway.
3. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
4. Build Command: `npm install`
5. Start Command: `node server.js`

### Frontend (Vercel)
1. Push code to GitHub.
2. Import project into Vercel.
3. Set Root Directory to `client` (if option available) or configure build settings.
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variable if needed (e.g., `VITE_API_URL` if you parameterize the API URL).
   - *Note: In `src/services/api.js`, update the baseURL to your specific deployed backend URL for production.*
