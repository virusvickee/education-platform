# 🎓 Education Platform – MERN + Redis

A full-stack educational platform built as part of a Full Stack Developer evaluation assignment.

This application allows:

- 🏫 Academies to upload subject PDFs with metadata
- 👨‍🎓 Students to search and preview PDFs
- ⚡ Redis caching for performance optimization
- 🔐 Secure JWT-based authentication
- 🌍 Fully deployed production setup

---

## 🚀 Live Demo

### 🌐 Frontend (Vercel)
https://education-platform-git-main-virusvickees-projects.vercel.app/login

### 🔗 Backend (Render)
https://education-platform12.onrender.com/

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- React-PDF

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Redis Cloud (ioredis)
- JWT Authentication
- bcryptjs
- Multer (File Upload)

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Cache → Redis Cloud

---

## 🏗 Project Architecture

```
Frontend (Vercel)
    ⬇
Backend API (Render)
    ⬇
MongoDB Atlas (Database)
    ⬇
Redis Cloud (Caching Layer)
```

---

## 🔐 Features

### 1️⃣ Authentication System

- User Registration (Academy / Student)
- Login with JWT
- Role-based authorization
- Protected routes
- Password hashing using bcryptjs

---

### 2️⃣ Academy Dashboard

After login, academy users can:

- Upload PDF files
- Add metadata:
  - Subject name
  - Class name
  - School name
- View uploaded PDFs

Only academy users can upload.

---

### 3️⃣ Student Dashboard

After login, student users can:

- Search PDFs by:
  - Subject
  - Class
  - School
- View results in card layout
- Preview PDF with page navigation

---

### 4️⃣ Redis Caching (Performance Optimization)

Redis is integrated to improve performance.

**Caching Strategy:**

- Search results are cached using a key format:
  ```
  pdf:<subject>:<className>:<school>
  ```
- TTL: 5 minutes (300 seconds)
- Cache invalidation occurs when a new PDF is uploaded

**Flow:**

1. Student searches for PDFs
2. Backend checks Redis
3. If cache exists → return cached result
4. If not → fetch from MongoDB → store in Redis → return result

This reduces database load and improves response time.

---

## 📂 Folder Structure

```
education-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── docs/
│   ├── DEPLOYMENT.md
│   ├── QUICKSTART.md
│   └── ...
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_cloud_url
```

### Frontend (.env)

```env
VITE_API_URL=https://education-platform12.onrender.com/api
```

---

## 📡 API Endpoints

### 🔐 Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### 📄 PDF

- `POST /api/pdf/upload` (Academy only)
- `GET /api/pdf/search` (Authenticated)

### 🩺 Health

- `GET /health`
- `GET /` (API info)

---

## 🔒 Security Practices

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based middleware
- Environment variables for secrets
- CORS configured for production
- Input validation
- File type validation (PDF only)
- File size limits (10MB)

---

## 🚀 Deployment Process

**Backend:**
- Hosted on Render
- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`
- Environment variables configured
- Node server binding to `process.env.PORT`

**Frontend:**
- Hosted on Vercel
- Root directory: `frontend`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable `VITE_API_URL` configured

---

## 🧪 Testing

- Postman used for API testing
- Production URLs tested
- Role-based access verified
- Redis cache verified through repeated search calls
- PDF upload and preview tested
- Cache hit/miss logged in console

---

## 📌 Assignment Requirements Fulfilled

✅ MERN stack used  
✅ Two user roles implemented (Academy & Student)  
✅ PDF upload with metadata  
✅ Search & preview functionality with React-PDF  
✅ Redis caching integration (5-min TTL)  
✅ Deployed on cloud platforms  
✅ Source code available on GitHub  
✅ Comprehensive documentation  

---

## 👨‍💻 Developer

**Vikas Uniyal**  
Full Stack Developer (MERN)

---

## 📬 Contact

For any queries regarding this project, please feel free to reach out.

---

## 📄 License

MIT

## 🚀 Features

### User Management
- **Two User Roles**: Academy and Student
- **Authentication**: JWT-based secure authentication
- **Password Security**: Bcrypt hashing

### Academy Features
- Upload PDF files with metadata (subject, class, school)
- PDF file validation (type and size)
- Automatic metadata management

### Student Features
- Search PDFs by subject, class name, or school
- Advanced PDF preview with page navigation
- Filter and view educational materials

### Performance Optimization
- **Redis Caching**: Search results cached for faster loading
- Automatic cache invalidation on new uploads
- Cache hit/miss tracking

## 🛠️ Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- React-PDF for PDF viewing

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- Redis (ioredis) for caching
- JWT for authentication
- Multer for file uploads
- Bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Redis (local or cloud)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd education-platform
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/education-platform
JWT_SECRET=your_secure_jwt_secret_key
REDIS_HOST=localhost
REDIS_PORT=6379
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 4. Start Services

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

Access the application at `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### PDF Management
- `POST /api/pdf/upload` - Upload PDF (Academy only)
- `GET /api/pdf/search` - Search PDFs (Authenticated)

## 🚀 Deployment

### Option 1: Render (Recommended)

1. **Push code to GitHub**
2. **Create Render account** at [render.com](https://render.com)
3. **Create Redis instance** on Render
4. **Create MongoDB** on MongoDB Atlas
5. **Deploy using render.yaml**:
   - Connect your GitHub repo
   - Render will auto-detect `render.yaml`
   - Set environment variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Generate a secure secret
     - `REDIS_HOST`: Your Render Redis hostname
     - `VITE_API_URL`: Your backend URL + /api

### Option 2: Vercel

1. **Backend**: Deploy to Render/Railway (Vercel doesn't support long-running processes)
2. **Frontend**: Deploy to Vercel
   ```bash
   cd frontend
   vercel --prod
   ```
3. Set `VITE_API_URL` environment variable in Vercel dashboard

### Option 3: AWS

**Backend (EC2):**
```bash
# SSH into EC2 instance
sudo apt update
sudo apt install nodejs npm mongodb redis-server
git clone <repo>
cd education-platform/backend
npm install
npm install -g pm2
pm2 start server.js
```

**Frontend (S3 + CloudFront):**
```bash
cd frontend
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

## 🔐 Environment Variables

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGO_URI | MongoDB connection | mongodb://localhost:27017/db |
| JWT_SECRET | JWT signing key | your_secret_key |
| REDIS_HOST | Redis hostname | localhost |
| REDIS_PORT | Redis port | 6379 |
| NODE_ENV | Environment | production |

### Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | https://api.example.com/api |

## 📁 Project Structure

```
education-platform/
├── backend/
│   ├── config/          # Database & Redis config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & upload middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded PDFs
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app
│   └── package.json
├── render.yaml          # Render deployment
├── vercel.json          # Vercel deployment
└── README.md
```

## 🧪 Testing

### Register Academy User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"academy@test.com","password":"test123","role":"academy"}'
```

### Upload PDF
```bash
curl -X POST http://localhost:5000/api/pdf/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "pdf=@test.pdf" \
  -F "subject=Math" \
  -F "className=Grade 10" \
  -F "school=ABC School"
```

### Search PDFs
```bash
curl http://localhost:5000/api/pdf/search?subject=Math \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Check connection string in `.env`

**Redis Connection Error:**
- Ensure Redis is running: `redis-cli ping`
- Should return `PONG`

**PDF Upload Fails:**
- Check file size (max 10MB)
- Ensure file is PDF format
- Verify `uploads/` directory exists

**CORS Errors:**
- Update CORS origin in `backend/server.js`
- Ensure frontend URL is whitelisted

## 📝 License

MIT

## 👤 Author

Developed as part of Full Stack Developer evaluation assignment.

## 🔗 Links

- **Live Demo**: [Add your deployed URL]
- **GitHub**: [Your repository URL]
- **Documentation**: See `/backend/README.md` for API details
