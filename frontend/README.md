# Educational Platform Frontend

Modern, responsive frontend for the Educational Platform built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client

## Features

### Authentication
- Login and Register pages
- JWT token management
- Role-based authentication (Academy/Student)
- Protected routes
- Auto-redirect based on role

### Academy Dashboard
- Modern sidebar navigation
- PDF upload form with drag-and-drop
- File validation (PDF only)
- Real-time upload progress
- Success/error notifications
- Clean, professional UI

### Student Dashboard
- Advanced search filters
- Grid layout for PDF cards
- PDF preview modal with iframe
- Responsive card design
- Empty states
- Loading states

### UI/UX Features
- Fully responsive (mobile + desktop)
- Modern SaaS dashboard design
- Smooth transitions and hover effects
- Soft shadows and rounded corners
- Indigo color scheme
- Clean spacing and typography
- Professional form inputs
- Loading spinners
- Error handling

## Installation

1. **Install dependencies:**
```bash
cd frontend
npm install
```

2. **Configure environment variables:**
Copy `.env.example` to `.env` and configure your API URL:
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

**Important:** The `.env` file is already in `.gitignore` to prevent committing sensitive values. Always commit `.env.example` with placeholder values, never commit `.env`.

3. **Start development server:**
```bash
npm run dev
```

The app will run on `http://localhost:5173` (Vite's default port, configurable in `vite.config.js`)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Top navigation with logout
│   ├── Sidebar.jsx        # Side navigation
│   ├── PdfCard.jsx        # PDF card with preview modal
│   └── Loader.jsx         # Loading spinner
├── pages/
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration with role selection
│   ├── AcademyDashboard.jsx  # Academy upload interface
│   └── StudentDashboard.jsx  # Student search interface
├── services/
│   └── api.js             # Axios instance and API calls
├── App.jsx                # Routes and protected routes
├── main.jsx               # Entry point
└── index.css              # Global styles + Tailwind
```

## Pages

### Login (`/login`)
- Email and password fields
- Form validation
- Error messages
- Auto-redirect after login
- Link to register page

### Register (`/register`)
- Email and password fields
- Role selection (Student/Academy)
- Visual role selector buttons
- Form validation
- Auto-redirect after registration
- Link to login page

### Academy Dashboard (`/academy`)
- Protected route (academy only)
- Upload form with fields:
  - Subject name
  - Class name
  - School name
  - PDF file upload
- Drag-and-drop file upload
- File type validation
- Success/error notifications
- Loading states

### Student Dashboard (`/student`)
- Protected route (student only)
- Search filters:
  - Subject (optional)
  - Class name (optional)
  - School (optional)
- Search results in grid layout
- PDF cards with:
  - Subject, class, school
  - Upload date
  - Preview button
- PDF preview modal
- Empty states
- Loading states

## API Integration

All API calls are handled through `src/services/api.js`:

```javascript
// Authentication
register({ email, password, role })
login({ email, password })

// PDF Management
uploadPdf(formData)
searchPdfs({ subject, className, school })
```

JWT token is automatically added to all requests via Axios interceptor.

## Protected Routes

Routes are protected based on authentication and role:

- `/login`, `/register` - Public
- `/academy` - Academy role only
- `/student` - Student role only
- `/` - Redirects to appropriate dashboard

## Styling

### Color Scheme
- Primary: Indigo (indigo-600, indigo-700)
- Background: Gray-50
- Cards: White with soft shadows
- Text: Gray-800, Gray-600, Gray-400

### Design Principles
- Rounded corners (rounded-lg, rounded-xl)
- Soft shadows (shadow-sm, shadow-md)
- Smooth transitions (transition-colors, transition-all)
- Hover effects on interactive elements
- Focus states with ring utilities
- Consistent spacing (p-4, p-6, p-8)

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Environment Variables

The project uses environment variables for configuration. Copy `.env.example` to create your `.env`:

```bash
cp .env.example .env
```

Example `.env` content:
```
VITE_API_URL=http://localhost:5000/api
```

**Security Note:** 
- `.env` is in `.gitignore` and should NEVER be committed
- Always commit `.env.example` with placeholder/example values
- Each environment (dev/staging/prod) should have its own `.env` file
- The `api.js` file already reads from `import.meta.env.VITE_API_URL`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

1. **Hot Module Replacement**: Vite provides instant HMR
2. **Tailwind IntelliSense**: Install VS Code extension for autocomplete
3. **React DevTools**: Use browser extension for debugging
4. **Network Tab**: Monitor API calls in browser DevTools

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Tailwind breakpoints used:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## Component Reusability

All components are modular and reusable:
- `Loader` - Can be used anywhere
- `Navbar` - Consistent across dashboards
- `Sidebar` - Role-aware navigation
- `PdfCard` - Reusable card with modal

## Future Enhancements

- Dark mode support
- Advanced filtering
- Pagination for search results
- File upload progress bar
- Toast notifications
- Profile management
- Password reset
- Email verification
