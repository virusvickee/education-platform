# Educational Platform Backend

Production-ready backend for a Full Stack Educational Platform using MERN stack with Redis caching.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Redis** - Caching layer (ioredis)
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling

## Features

### User System
- Two roles: `academy` and `student`
- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization

### Academy Features
- Upload PDF files with metadata
- Metadata includes: subject, class name, school name
- Only PDF files allowed (validated)

### Student Features
- Search PDFs by subject, className, or school
- View PDF metadata
- Filter using query parameters

### Redis Caching
- Cache search results for 60 seconds
- Cache key format: `pdf:<subject>:<className>:<school>`
- Automatic cache invalidation on new uploads

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment variables:**
Edit `.env` file with your configuration:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=your_jwt_secret_key_change_in_production
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=development
```

3. **Ensure MongoDB and Redis are running:**
```bash
# MongoDB (default port 27017)
mongod

# Redis (default port 6379)
redis-server
```

4. **Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "academy" // or "student"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### PDF Management

#### Upload PDF (Academy Only)
```http
POST /api/pdf/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

pdf: <file>
subject: "Mathematics"
className: "Grade 10"
school: "ABC High School"
```

#### Search PDFs (Authenticated)
```http
GET /api/pdf/search?subject=Mathematics&className=Grade 10&school=ABC High School
Authorization: Bearer <token>
```

Query parameters (all optional):
- `subject` - Filter by subject name
- `className` - Filter by class name
- `school` - Filter by school name

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── redis.js           # Redis connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── pdfController.js   # PDF upload/search logic
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   ├── roleMiddleware.js  # Role-based access control
│   └── upload.js          # Multer configuration
├── models/
│   ├── User.js            # User schema
│   └── Pdf.js             # PDF schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   └── pdfRoutes.js       # PDF endpoints
├── uploads/               # Uploaded PDF files
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
└── server.js             # Entry point
```

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token-based authentication
- Password excluded from API responses
- Role-based access control
- File type validation (PDF only)
- File size limit (10MB)
- Environment variable protection

## Error Handling

All endpoints return consistent JSON responses:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Cache Strategy

- Search results cached for 60 seconds
- Cache automatically cleared when new PDF uploaded
- Cache key includes all search parameters
- Response includes `source` field (`cache` or `database`)

## Development

```bash
# Install nodemon for development
npm install -D nodemon

# Run in development mode
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or production MongoDB
4. Configure Redis Cloud or production Redis
5. Set up proper CORS origins
6. Use process manager (PM2)
7. Set up reverse proxy (Nginx)
8. Enable HTTPS

## Health Check

```http
GET /health
```

Returns server status and timestamp.
