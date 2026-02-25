# Educational Platform - Full Stack MERN Application

A complete educational platform built with MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, PDF management, search functionality, and Redis caching for optimized performance.

## 📁 Project Structure

```
education-platform/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database & Redis configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, upload, role middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── uploads/            # PDF storage
│   └── server.js           # Entry point
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   └── package.json
│
├── docs/                   # Documentation
│   ├── DEPLOYMENT.md      # Deployment guide
│   ├── QUICKSTART.md      # Quick setup guide
│   └── ...
│
├── .gitignore
├── README.md
├── render.yaml            # Render deployment config
└── vercel.json            # Vercel deployment config
```

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
