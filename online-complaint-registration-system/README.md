# Online Complaint Registration and Management System

A full-stack MERN web application designed to simplify complaint registration, tracking, assignment, resolution, and feedback between users, agents, and administrators.

## Main Modules

- User registration and login with JWT authentication
- Role-based access for USER, AGENT, and ADMIN
- Complaint submission and tracking
- Admin complaint analytics dashboard
- Agent assignment and status update workflow
- User-agent communication notes
- Feedback and rating after complaint resolution
- MongoDB schemas for users, complaints, messages, and feedback
- API protection using Helmet, CORS, bcryptjs, and middleware authorization

## Tech Stack

Frontend: React.js, CSS, Bootstrap-ready responsive UI, Axios-ready API service  
Backend: Node.js, Express.js, MongoDB, Mongoose  
Security: JWT, bcryptjs, Helmet, CORS, role-based middleware

## Run Locally

Backend:
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Frontend:
```bash
cd client
npm install
npm run dev
```

## Demo Notes

The frontend includes a presentation-friendly demo flow using the same existing CSS theme. Switch between USER, AGENT, and ADMIN views from the top-right role selector to show different dashboard actions.
