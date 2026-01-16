# Storage Management System (Backend)

This is a backend project for a Storage Management System built with Node.js, Express, and MongoDB.

## Features

- User Authentication
  - Register / Login
  - JWT token for protected routes
- Storage Management
  - 15GB per user
  - Default folders: images, pdf, notes
  - File upload per folder (images/pdf/notes)
  - Track used storage
- File Management
  - List files per folder
  - Upload file with size & type validation

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Multer for file upload

## Folder Structure

storage-management-backend/
├── server.js
├── app.js
├── .env
├── config/
├── models/
├── controllers/
├── routes/
├── middlewares/
├── utils/
└── uploads/


## Installation

1. Clone repo:
```bash
git clone https://github.com/rjriajul1/stroage-management-system.git

npm install

Setup .env file:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
BASE_URL=http://localhost:5000


API Endpoints:

Auth

POST /api/auth/register

POST /api/auth/login

Storage

POST /api/storage/create-folders

POST /api/storage/upload

GET /api/storage/files/:folder