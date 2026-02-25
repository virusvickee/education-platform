# Quick Start Guide

## Local Development (5 minutes)

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Setup Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=mysecretkey123
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Services

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Redis:**
```bash
redis-server
```

**Terminal 3 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 4 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Access Application
Open browser: http://localhost:5173

### 5. Test the Application

1. **Register Academy User:**
   - Email: academy@test.com
   - Password: test123
   - Role: Academy

2. **Upload PDF:**
   - Login as academy user
   - Upload a PDF with metadata

3. **Register Student User:**
   - Email: student@test.com
   - Password: test123
   - Role: Student

4. **Search PDFs:**
   - Login as student user
   - Search using filters
   - Preview PDFs

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Troubleshooting

**MongoDB not running:**
```bash
sudo systemctl start mongod
```

**Redis not running:**
```bash
sudo systemctl start redis
```

**Port already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```
