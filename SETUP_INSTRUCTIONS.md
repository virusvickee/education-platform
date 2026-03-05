# Setup Instructions for Updated Features

## New Features Added

1. **Complete CRUD Operations for PDFs**
   - GET /api/pdf/:id - Get single PDF by ID
   - PUT /api/pdf/:id - Update PDF metadata (Academy only)
   - DELETE /api/pdf/:id - Delete PDF (Academy only)

2. **Cloudinary Integration**
   - Replaced local file storage with Cloudinary
   - Persistent cloud storage for PDFs
   - Automatic cleanup on delete

3. **Input Validation**
   - Email format validation (regex)
   - Password minimum length (6 characters)

4. **Enhanced Cache Invalidation**
   - Cache cleared on update and delete operations
   - Multiple cache keys invalidated for comprehensive updates

## Cloudinary Setup

1. **Create Cloudinary Account**
   - Go to https://cloudinary.com
   - Sign up for a free account
   - Navigate to Dashboard

2. **Get Your Credentials**
   - Cloud Name
   - API Key
   - API Secret

3. **Update .env File**
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

## Testing the New Endpoints

### Get PDF by ID
```bash
curl http://localhost:5000/api/pdf/YOUR_PDF_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update PDF Metadata
```bash
curl -X PUT http://localhost:5000/api/pdf/YOUR_PDF_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject":"Updated Math","className":"Grade 11","school":"XYZ School"}'
```

### Delete PDF
```bash
curl -X DELETE http://localhost:5000/api/pdf/YOUR_PDF_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Email Validation
```bash
# Invalid email - should fail
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalidemail","password":"test123","role":"student"}'

# Short password - should fail
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"12345","role":"student"}'

# Valid - should succeed
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","role":"student"}'
```

## Deployment Updates

### Environment Variables to Add

**Render/Railway/Heroku:**
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

**Vercel (if using serverless):**
Same as above

## Migration Notes

- Existing PDFs with local file paths will still work
- New uploads will use Cloudinary
- The `cloudinaryId` field is optional for backward compatibility
- Delete operation checks for `cloudinaryId` before attempting Cloudinary deletion

## Security Improvements

1. **Authorization Checks**
   - Users can only update/delete their own PDFs
   - Academy role required for upload/update/delete

2. **Input Validation**
   - Email format validated with regex
   - Password length enforced (minimum 6 characters)

3. **Cloud Storage**
   - No local file system dependencies
   - Persistent storage across deployments
   - Automatic CDN delivery

## Cache Strategy

Cache is now invalidated on:
- Upload (original behavior)
- Update (new)
- Delete (new)

Multiple cache keys are cleared to ensure consistency:
- Specific search combinations
- General "all" queries
