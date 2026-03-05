# API Endpoints Summary

## Authentication Endpoints

### POST /api/auth/register
**Access:** Public  
**Validation:**
- Email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Password minimum 6 characters
- Role must be 'academy' or 'student'

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "academy"
}
```

### POST /api/auth/login
**Access:** Public  
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
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

### GET /api/pdf/search
**Access:** Private (Authenticated)  
**Query Parameters:**
- subject (optional)
- className (optional)
- school (optional)

**Response includes cache source (cache/database)**

### GET /api/pdf/:id
**Access:** Private (Authenticated)  
**Description:** Get single PDF by ID

**Response:**
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

**Cache Invalidation:** Clears both old and new metadata cache keys

### DELETE /api/pdf/:id
**Access:** Private (Academy only - must be owner)  
**Description:** Delete PDF from database and Cloudinary

**Response:**
```json
{
  "success": true,
  "message": "PDF deleted successfully"
}
```

**Actions:**
1. Deletes file from Cloudinary
2. Removes document from MongoDB
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
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid credentials)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Server Error
