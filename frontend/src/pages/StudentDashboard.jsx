import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import PdfCard from '../components/PdfCard';
import { searchPdfs } from '../services/api';
import Loader from '../components/Loader';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ subject: '', className: '', school: '' });
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPdfs([]);
    setLoading(true);
    setSearched(true);

    try {
      const params = {};
      if (filters.subject) params.subject = filters.subject;
      if (filters.className) params.className = filters.className;
      if (filters.school) params.school = filters.school;

      const { data } = await searchPdfs(params);
      const pdfs = Array.isArray(data?.data) ? data.data : [];
      setPdfs(pdfs);
      
      if (pdfs.length === 0) {
        toast('No PDFs found', { icon: '📭' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Search failed');
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-col md:flex-row">
        <Sidebar role="student" />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Search PDFs</h2>
              <p className="text-gray-600 mt-2">Find educational materials by subject, class, or school</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={filters.subject}
                      onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <input
                      type="text"
                      value={filters.className}
                      onChange={(e) => setFilters({ ...filters, className: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., Grade 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                    <input
                      type="text"
                      value={filters.school}
                      onChange={(e) => setFilters({ ...filters, school: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., ABC School"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? <Loader /> : '🔍 Search PDFs'}
                </button>
              </form>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader />
              </div>
            ) : searched ? (
              pdfs.length > 0 ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Found {pdfs.length} {pdfs.length === 1 ? 'result' : 'results'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pdfs.map((pdf) => (
                      <PdfCard key={pdf._id} pdf={pdf} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <div className="text-gray-400 text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search filters</p>
                </div>
              )
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Start searching</h3>
                <p className="text-gray-600">Use the filters above to find PDFs</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
