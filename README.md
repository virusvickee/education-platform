# 🎓 Education Platform – MERN + Redis + Cloudinary

A full-stack educational platform with complete CRUD operations, cloud storage, and Redis caching.

## 🌐 Live Demo

- **Frontend:** https://education-platform-git-main-virusvickees-projects.vercel.app/login
- **Backend:** https://education-platform12.onrender.com/

---

## ✨ Features

### Authentication & Authorization
- JWT-based authentication with 30-day token expiration
- Role-based access control (Academy / Student)
- Email validation and 8-character minimum password
- Secure password hashing with bcrypt

### Academy Features
- Upload PDFs with metadata (subject, class, school)
- Edit PDF metadata (subject, className, school)
- Delete PDFs with confirmation
- View all uploaded PDFs
- Ownership-based access control

### Student Features
- Search PDFs by subject, class, or school
- Preview PDFs with page navigation
- Responsive PDF viewer with React-PDF
- Loading states and error handling

### Performance & Storage
- Redis caching with 5-minute TTL
- Cloudinary cloud storage for PDFs
- Cache invalidation on upload/update/delete
- Automatic CDN delivery

### UI/UX
- Toast notifications for all actions
- Loading spinners and error messages
- Fully responsive mobile design
- ARIA attributes and keyboard navigation
- Confirmation dialogs for destructive actions

---

## 🛠 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Axios
- React Router DOM
- React-PDF
- React Hot Toast

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Redis (ioredis)
- JWT Authentication
- Cloudinary
- Multer
- bcryptjs

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Cache → Redis Cloud
- Storage → Cloudinary

---

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Redis (local or cloud)
- Cloudinary account

---

## 🚀 Quick Start

### 1. Clone Repository
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
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

Start backend:
```bash
npm run dev
# Running at http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

Start frontend:
```bash
npm run dev
# Running at http://localhost:5173
```

### 4. Access Application
Open http://localhost:5173 in your browser

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user (email, password min 8 chars, role)
- `POST /api/auth/login` - Login user

### PDF Management
- `POST /api/pdf/upload` - Upload PDF (Academy only)
- `GET /api/pdf/search` - Search PDFs (Authenticated)
- `GET /api/pdf/:id` - Get single PDF by ID
- `PUT /api/pdf/:id` - Update PDF metadata (Academy only, owner)
- `DELETE /api/pdf/:id` - Delete PDF (Academy only, owner)

**Authorization Header:**
```
Authorization: Bearer <token>
```

---

## 🔒 Security Features

- JWT tokens with 30-day expiration
- Password hashing with bcrypt
- Role-based middleware (Academy/Student)
- Ownership verification for update/delete
- Email format validation
- 8-character minimum password
- Input validation on all endpoints
- HTTPS required in production
- Invalid MongoDB ID handling (400 instead of 500)

---

## 🎨 User Roles & Permissions

### Academy Role
- ✅ Upload PDFs with metadata
- ✅ Edit own PDF metadata
- ✅ Delete own PDFs
- ✅ View own uploaded PDFs
- ❌ Cannot modify other users' PDFs

### Student Role
- ✅ Search PDFs by filters
- ✅ Preview PDFs with navigation
- ❌ Cannot upload PDFs
- ❌ Cannot edit or delete PDFs

---

## 📂 Project Structure

```
education-platform/
├── backend/
│   ├── config/          # DB, Redis, Cloudinary config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & upload middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── services/    # API services
│   └── package.json
└── README.md
```

---

## 🧪 Testing

### Register Academy User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"academy@test.com","password":"test1234","role":"academy"}'
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

### Update PDF
```bash
curl -X PUT http://localhost:5000/api/pdf/PDF_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject":"Updated Math","className":"Grade 11"}'
```

### Delete PDF
```bash
curl -X DELETE http://localhost:5000/api/pdf/PDF_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Redis Connection Error
```bash
# Check if Redis is running
redis-cli ping
# Should return: PONG

# Start Redis
redis-server
```

### PDF Upload Fails
- Check file size (max 10MB)
- Ensure file is PDF format
- Verify Cloudinary credentials in .env

### CORS Errors
- Update CORS origin in `backend/server.js`
- Ensure frontend URL is whitelisted

---

## 🚀 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set root directory: `backend`
5. Build command: `npm install`
6. Start command: `node server.js`
7. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `REDIS_HOST`
   - `REDIS_PORT`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NODE_ENV=production`

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Set root directory: `frontend`
4. Framework: Vite
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com/api`

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_min_32_chars
REDIS_HOST=redis-host.com
REDIS_PORT=6379
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🔄 Recent Updates

### Backend Improvements
- ✅ Complete CRUD operations for PDFs
- ✅ Cloudinary integration for persistent storage
- ✅ Enhanced cache invalidation
- ✅ Invalid MongoDB ID handling (400 status)
- ✅ Password minimum increased to 8 characters
- ✅ Improved deletion order (DB first, then Cloudinary)

### Frontend Improvements
- ✅ Edit/Delete buttons with confirmation modals
- ✅ Toast notifications for all actions
- ✅ Loading spinners and error messages
- ✅ Improved PDF preview with ARIA attributes
- ✅ Keyboard navigation (Escape to close)
- ✅ Null safety checks throughout
- ✅ Fully responsive mobile design

### Documentation
- ✅ Complete API endpoint documentation
- ✅ Detailed setup instructions
- ✅ Testing guide with examples
- ✅ Authorization policy clarification

---

## 🎯 Key Features Implemented

✅ MERN stack with Redis caching  
✅ Two user roles (Academy & Student)  
✅ Complete CRUD operations  
✅ PDF upload with Cloudinary storage  
✅ Search & preview with React-PDF  
✅ JWT authentication with role-based access  
✅ Cache invalidation on data changes  
✅ Responsive UI with Tailwind CSS  
✅ Toast notifications  
✅ Error handling and validation  
✅ Deployed on cloud platforms  

---

## 📄 License

MIT

---

## 👨‍💻 Developer

**Vikas Uniyal**  
Full Stack Developer (MERN)

---

## 📬 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation
- Verify environment variables
- Check browser console for errors

---

## 🔗 Additional Resources

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Redis Cloud](https://redis.com/try-free/)
- [Cloudinary](https://cloudinary.com/)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)
