import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import Login from './pages/Login';
import Register from './pages/Register';
import AcademyDashboard from './pages/AcademyDashboard';
import StudentDashboard from './pages/StudentDashboard';

const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const PublicOnlyRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = getStoredUser();

  if (token && user) {
    const redirectPath = user.role === 'academy' ? '/academy' : user.role === 'student' ? '/student' : '/login';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    if (user.role === 'academy') {
      return <Navigate to="/academy" replace />;
    } else if (user.role === 'student') {
      return <Navigate to="/student" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const token = localStorage.getItem('token');
  const user = getStoredUser();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route 
          path="/" 
          element={
            token && user ? (
              user.role === 'academy' ? (
                <Navigate to="/academy" replace />
              ) : user.role === 'student' ? (
                <Navigate to="/student" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          } 
        />
        <Route
          path="/academy"
          element={
            <ProtectedRoute allowedRole="academy">
              <AcademyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
