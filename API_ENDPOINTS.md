# API Endpoints Summary

## Authentication Endpoints

### POST /api/auth/register
**Access:** Public  
**Authentication:** JWT with Bearer tokens  
**Validation:**
- Email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Password minimum 8 characters
- Role must be 'academy' or 'student'

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "academy"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "role": "academy",
      "createdAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Token Details:**
- Type: JWT Bearer token
- Expiration: 30 days
- Usage: Include in Authorization header as `Bearer <token>`
- HTTPS required in production

### POST /api/auth/login
**Access:** Public  
**Rate Limiting:** 
- Not currently implemented (recommended: 5 attempts per 10 minutes per IP)
- When exceeded: Return 429 Too Many Requests with Retry-After header
- Successful login should reset counter

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "...",
      "email": "user@example.com",
      "role": "academy",
      "createdAt": "..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Authorization Header Format:**
```
Authorization: Bearer <token>
```

---

## PDF Endpoints

### POST /api/pdf/upload
**Access:** Private (Academy only)  
**Content-Type:** multipart/form-data  
**Storage:** Cloudinary

**Form Data:**
- pdf: File (PDF only, max 10MB)
- subject: String
- className: String
- school: String

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "subject": "Mathematics",
    "className": "Grade 10",
    "school": "ABC School",
    "fileUrl": "https://res.cloudinary.com/.../education-pdfs/...",
    "cloudinaryId": "education-pdfs/pdf-1234567890",
    "uploadedBy": {
      "_id": "...",
      "email": "academy@example.com",
      "role": "academy"
    },
    "createdAt": "2026-03-05T10:00:00.000Z",
    "updatedAt": "2026-03-05T10:00:00.000Z"
  }
}
```

### GET /api/pdf/search
**Access:** Private (Authenticated)  
**Query Parameters:**
- subject (optional)
- className (optional)
- school (optional)
- page (optional, default: 1) - Not yet implemented
- limit (optional, default: 20, max: 100) - Not yet implemented

**Note:** Pagination parameters are documented for future implementation.

**Response includes cache source (cache/database)**

**Success Response (200 OK):**
```json
{
  "success": true,
  "source": "cache",
  "data": [
    {
      "_id": "...",
      "subject": "Mathematics",
      "className": "Grade 10",
      "school": "ABC School",
      "fileUrl": "https://res.cloudinary.com/...",
      "cloudinaryId": "education-pdfs/...",
      "uploadedBy": {...},
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

**Future Pagination Response:**
```json
{
  "success": true,
  "source": "database",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  },
  "data": [...]
}
```

### GET /api/pdf/:id
**Access:** Private (Authenticated)  
**Description:** Get single PDF by ID

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "subject": "Math",
    "className": "Grade 10",
    "school": "ABC School",
    "fileUrl": "https://cloudinary.com/...",
    "cloudinaryId": "education-pdfs/...",
    "uploadedBy": {...},
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### PUT /api/pdf/:id
**Access:** Private (Academy only - must be owner)  
**Description:** Update PDF metadata only (not the file)

**Request Body:**
```json
{
  "subject": "Updated Subject",
  "className": "Updated Class",
  "school": "Updated School"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "subject": "Updated Subject",
    "className": "Updated Class",
    "school": "Updated School",
    "fileUrl": "https://cloudinary.com/...",
    "cloudinaryId": "education-pdfs/...",
    "uploadedBy": {
      "_id": "...",
      "email": "academy@example.com",
      "role": "academy"
    },
    "createdAt": "2026-03-05T10:00:00.000Z",
    "updatedAt": "2026-03-05T10:15:00.000Z"
  }
}
```

**Cache Invalidation:** Clears both old and new metadata cache keys

### DELETE /api/pdf/:id
**Access:** Private (Academy only - must be owner)  
**Description:** Delete PDF from database and Cloudinary

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "PDF deleted successfully"
}
```

**Actions:**
1. Deletes document from MongoDB
2. Deletes file from Cloudinary (if cloudinaryId exists)
3. Invalidates related cache keys

---

## Error Responses

All endpoints return consistent error format:
```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request (validation errors, invalid ID format)
- 401: Unauthorized (invalid credentials)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 429: Too Many Requests (rate limit exceeded)
- 500: Server Error
