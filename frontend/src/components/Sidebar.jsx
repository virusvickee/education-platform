import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Sidebar = ({ role }) => {
  if (!role || !['academy', 'student'].includes(role)) {
    console.error('Invalid role provided to Sidebar:', role);
    return null;
  }

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          {role === 'academy' ? 'Academy Dashboard' : 'Student Dashboard'}
        </h2>
        <nav className="space-y-2">
          {role === 'academy' ? (
            <>
              <NavLink
                to="/academy"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <span aria-hidden="true">📤</span> Upload PDF
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/student"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <span aria-hidden="true">🔍</span> Search PDFs
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  role: PropTypes.oneOf(['academy', 'student']).isRequired
};

export default Sidebar;
