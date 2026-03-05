# Quick Testing Guide

## 🚀 Start the Application

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# Access at: http://localhost:5173
```

## 🧪 Test Scenarios

### Scenario 1: Academy User Flow

1. **Register as Academy**
   - Go to http://localhost:5173/register
   - Enter email: `academy@test.com`
   - Enter password: `test123` (min 6 chars)
   - Select "Academy" role
   - Click "Create Account"
   - ✅ Should see success toast
   - ✅ Should redirect to /academy

2. **Upload PDF**
   - Fill in: Subject, Class, School
   - Select a PDF file
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

1. **Register as Student**
   - Go to http://localhost:5173/register
   - Enter email: `student@test.com`
   - Enter password: `test123`
   - Select "Student" role
   - Click "Create Account"
   - ✅ Should see success toast
   - ✅ Should redirect to /student

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
   - ✅ Should see error toast

2. **Short Password**
   - Try registering with: `12345` (5 chars)
   - ✅ Should see error toast

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
- ❌ "Password must be at least 6 characters long"
- ❌ "Invalid credentials"
- ❌ "User already exists with this email"
- ❌ "Upload failed"
- ❌ "Update failed"
- ❌ "Delete failed"
- ❌ "Search failed"

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
