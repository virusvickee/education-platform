# Quick Testing Guide

## 🚀 Setup and Start the Application

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or connection string
- Redis running locally or connection string

### Backend Setup
```bash
# Terminal 1 - Backend
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
cp .env.example .env

# Edit .env with your values:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/education-platform
# JWT_SECRET=your_secret_key
# REDIS_HOST=localhost
# REDIS_PORT=6379
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Start backend
npm run dev
# Backend running at: http://localhost:5000
```

### Frontend Setup
```bash
# Terminal 2 - Frontend
cd frontend

# Install dependencies
npm install

# Create .env file (if not exists)
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev
# Access at: http://localhost:5173
```

### Database Setup/Reset
```bash
# If you need to reset the database for testing:
# Option 1: Drop the database in MongoDB
mongosh
use education-platform
db.dropDatabase()
exit

# Option 2: Delete specific test users manually
mongosh
use education-platform
db.users.deleteOne({email: "academy@test.com"})
db.users.deleteOne({email: "student@test.com"})
exit
```

## 🧪 Test Scenarios

### Scenario 1: Academy User Flow

1. **Register as Academy**
   - Go to http://localhost:5173/register
   - Enter email: `academy@test.com`
   - Enter password: `test1234` (min 8 chars)
   - Select "Academy" role
   - Click "Create Account"
   - ✅ Should see success toast
   - ✅ Should redirect to /academy

   **Note:** If you get "User already exists" error:
   - Option 1: Use a different email (e.g., `academy2@test.com`)
   - Option 2: Delete the user from database:
     ```bash
     mongosh
     use education-platform
     db.users.deleteOne({email: "academy@test.com"})
     db.pdfs.deleteMany({uploadedBy: ObjectId("USER_ID")})
     exit
     ```

2. **Upload PDF**
   - Fill in: Subject (e.g., "Mathematics"), Class (e.g., "Grade 10"), School (e.g., "ABC School")
   - Select a PDF file
     - **Test PDF Sources:**
       - Use any PDF file you have (max 10MB)
       - Download sample: https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
       - Create test PDF: Print any document to PDF
     - **Recommended:** Standard PDF with text content, not just scanned images
     - **File Requirements:** PDF format, ≤ 10MB, contains readable text
     - **Edge Cases to Test:**
       - Large file (close to 10MB limit)
       - Image-only PDF (should upload but may not be searchable)
       - Malformed/corrupted PDF (should fail with error)
   - Click "Upload PDF"
   - ✅ Should see success toast
   - ✅ PDF should appear in list below

3. **Edit PDF**
   - Click "Edit" button on any PDF card
   - Modify metadata (subject/class/school)
   - Click "Save Changes"
   - ✅ Should see success toast
   - ✅ Card should update with new data

4. **Delete PDF**
   - Click "Delete" button on any PDF card
   - ✅ Should see confirmation modal
   - Click "Delete" to confirm
   - ✅ Should see success toast
   - ✅ PDF should disappear from list

5. **Logout**
   - Click "Logout" button in navbar
   - ✅ Should see logout toast
   - ✅ Should redirect to /login

### Scenario 2: Student User Flow

**Prerequisite:** Ensure PDFs exist in the system before testing student features.
- Option 1: Complete "Scenario 1: Academy User Flow" first to upload PDFs
- Option 2: If you have existing PDFs in the database from previous tests, you can proceed directly

1. **Register as Student**
   - Go to http://localhost:5173/register
   - Enter email: `student@test.com`
   - Enter password: `test1234` (min 8 chars)
   - Select "Student" role
   - Click "Create Account"
   - ✅ Should see success toast
   - ✅ Should redirect to /student

   **Note:** If you get "User already exists" error:
   - Option 1: Use a different email (e.g., `student2@test.com`)
   - Option 2: Delete the user from database (see Scenario 1 cleanup instructions)

2. **Search PDFs**
   - Enter search filters (subject/class/school)
   - Click "Search PDFs"
   - ✅ Should see loading spinner
   - ✅ Should see results or "No results found"

3. **Preview PDF**
   - Click "Preview PDF" on any card
   - ✅ Should open modal with PDF
   - ✅ Should see page number display
   - Click "Next" button
   - ✅ Should navigate to next page
   - Click "Previous" button
   - ✅ Should navigate to previous page
   - Click "X" button
   - ✅ Should close modal

4. **Empty Search**
   - Search with filters that return no results
   - ✅ Should see "No results found" message

5. **Logout**
   - Click "Logout" button
   - ✅ Should redirect to login

### Scenario 3: Error Handling

1. **Invalid Email**
   - Try registering with: `invalidemail`
   - ✅ Should see error toast: "Please provide a valid email address"

2. **Short Password**
   - Try registering with: `test12` (7 chars)
   - ✅ Should see error toast: "Password must be at least 8 characters long"

3. **Wrong Login Credentials**
   - Try logging in with wrong password
   - ✅ Should see "Invalid credentials" toast

4. **Existing Email**
   - Try registering with existing email
   - ✅ Should see "User already exists" toast

### Scenario 4: Mobile Responsiveness

1. **Open DevTools**
   - Press F12
   - Click device toolbar icon (Ctrl+Shift+M)

2. **Test Mobile View**
   - Select iPhone/Android device
   - ✅ Navbar should be compact
   - ✅ Sidebar should be horizontal
   - ✅ Forms should stack vertically
   - ✅ Cards should be single column
   - ✅ Modals should fit screen

3. **Test Tablet View**
   - Select iPad device
   - ✅ Should show 2-column grid
   - ✅ Sidebar should be vertical

## 🎯 Expected Toast Notifications

### Success Toasts (Green)
- ✅ "Registration successful!"
- ✅ "Login successful!"
- ✅ "PDF uploaded successfully!"
- ✅ "PDF updated successfully!"
- ✅ "PDF deleted successfully!"
- ✅ "Logged out successfully"

### Error Toasts (Red)
- ❌ "Please provide a valid email address"
- ❌ "Password must be at least 8 characters long"
- ❌ "Invalid credentials"
- ❌ "User already exists with this email"
- ❌ "Invalid PDF id" (for malformed IDs)
- ❌ "Upload failed"
- ❌ "Update failed"
- ❌ "Delete failed"
- ❌ "Search failed"
- ❌ "Failed to load PDF. Please try again."

### Info Toasts (Blue)
- 📭 "No PDFs found"

## 🔍 Visual Checks

### Academy Dashboard
- ✅ Upload form at top
- ✅ "My Uploaded PDFs" section below
- ✅ Each PDF card has Edit and Delete buttons
- ✅ Empty state shows "No PDFs uploaded yet"

### Student Dashboard
- ✅ Search form at top
- ✅ Results section below
- ✅ Each PDF card has Preview button
- ✅ Empty state shows "Start searching"
- ✅ No results shows "No results found"

### Modals
- ✅ Edit modal has form with 3 fields
- ✅ Delete modal has confirmation message
- ✅ Preview modal has PDF viewer with navigation
- ✅ All modals have close buttons

### Navbar
- ✅ Shows "EduPlatform" logo
- ✅ Shows user email
- ✅ Shows role badge (Academy/Student)
- ✅ Shows Logout button

## 🐛 Common Issues

### Issue: Toast not showing
**Solution:** Check that ToastContainer is in App.jsx

### Issue: PDF preview not loading
**Solution:** Check VITE_API_URL in .env file

### Issue: Edit/Delete not working
**Solution:** Verify backend is running and CRUD endpoints are available

### Issue: Mobile view broken
**Solution:** Clear browser cache and reload

## 📊 Performance Checks

- ✅ Loading spinners appear during async operations
- ✅ Buttons disable during loading
- ✅ No layout shifts during loading
- ✅ Smooth animations and transitions
- ✅ Fast response times

## ✅ Checklist

Before marking as complete, verify:

- [ ] All toast notifications work
- [ ] Edit modal updates PDF correctly
- [ ] Delete confirmation works
- [ ] PDF preview modal has navigation
- [ ] Logout button works on both dashboards
- [ ] Mobile responsive on all pages
- [ ] Loading states show correctly
- [ ] Error messages display properly
- [ ] No console errors
- [ ] All buttons are clickable
- [ ] Forms validate correctly
- [ ] Modals close properly

## 🎉 Success Criteria

All features working = Ready for production! 🚀
