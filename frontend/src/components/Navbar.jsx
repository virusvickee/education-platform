const Navbar = ({ onLogout }) => {
  const getStoredUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : {};
    } catch {
      return {};
    }
  };

  const user = getStoredUser();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-indigo-600">EduPlatform</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm text-gray-600 truncate max-w-[120px] md:max-w-none">
              {user.email || 'Guest'}
            </span>
            {user.role && (
              <span className="px-2 md:px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 capitalize">
                {user.role}
              </span>
            )}
            <button
              onClick={onLogout}
              className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
