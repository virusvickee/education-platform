# Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Render account (free tier) OR Vercel account

## Step-by-Step Deployment

### 1. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) for development
5. Get your connection string (replace `<password>` with your password)

### 2. Setup Redis (Render)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Redis"
3. Choose free plan
4. Note the Internal Redis URL

### 3. Deploy Backend (Render)

1. Push code to GitHub
2. Go to Render Dashboard
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: education-platform-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `NODE_ENV` = production
   - `PORT` = 5000
   - `MONGO_URI` = (your MongoDB Atlas connection string)
   - `JWT_SECRET` = (generate random string)
   - `REDIS_HOST` = (your Redis internal hostname)
   - `REDIS_PORT` = 6379
7. Click "Create Web Service"
8. Note your backend URL (e.g., https://your-app.onrender.com)

### 4. Deploy Frontend (Render)

1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect same GitHub repository
4. Configure:
   - **Name**: education-platform-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
5. Add Environment Variable:
   - `VITE_API_URL` = (your backend URL + /api)
6. Click "Create Static Site"

### 5. Alternative: Deploy Frontend to Vercel

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

Set environment variable in Vercel dashboard:
- `VITE_API_URL` = your backend URL + /api

## Post-Deployment

1. Test registration: Create academy and student accounts
2. Test upload: Upload a PDF as academy user
3. Test search: Search PDFs as student user
4. Verify Redis caching is working (check response times)

## Troubleshooting

**Backend won't start:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check Redis connection

**Frontend can't connect to backend:**
- Verify VITE_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running

**PDF upload fails:**
- Check file size limit
- Verify uploads directory exists
- Check file permissions

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Redis instance created
- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Test user registration
- [ ] Test PDF upload
- [ ] Test PDF search
- [ ] Test PDF preview
- [ ] Redis caching verified
