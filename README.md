# Real-Time Sports Booking & Matchmaking Platform

A full-stack sports facility booking platform built using the MERN stack, enabling
solo players to find teammates through real-time, skill-based matchmaking and
automated court booking.

## 🚀 Features
- Role-based access (Users / Owners)
- Sports facility listing and time-slot booking
- Real-time player matchmaking using Socket.io
- Skill-based queue system (Beginner / Intermediate / Pro)
- Private group and matchmaking-based bookings
- Gamification: XP, badges, reliability scores
- Firebase authentication and image storage

## 🧠 Matchmaking Architecture
- Queue-based matchmaking using MongoDB
- Real-time notifications via WebSockets
- Automatic shared booking generation on match success

## 🛠️ Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Real-Time: Socket.io
- Authentication: Firebase Auth
- Storage: Firebase Storage

## 📁 Project Structure
Refer to `/docs` for architecture diagrams and flow explanations.

## ⚙️ Setup Instructions
```bash
git clone https://github.com/yourusername/realtime-sports-matchmaking
cd server
npm install
npm run dev
