import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  if (!role || !['academy', 'student'].includes(role)) {
    return null;
  }

  return (
    <aside className="w-full md:w-64 bg-white shadow-sm border-b md:border-r md:border-b-0 border-gray-200 md:min-h-screen">
      <div className="p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6">
          {role === 'academy' ? 'Academy Dashboard' : 'Student Dashboard'}
        </h2>
        <nav className="flex md:flex-col md:space-y-2 space-x-2 md:space-x-0">
          {role === 'academy' ? (
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
              📤 Upload PDF
            </NavLink>
          ) : (
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
              🔍 Search PDFs
            </NavLink>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
