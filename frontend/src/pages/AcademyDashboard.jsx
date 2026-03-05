import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AcademyPdfCard from '../components/AcademyPdfCard';
import EditModal from '../components/EditModal';
import ConfirmModal from '../components/ConfirmModal';
import Loader from '../components/Loader';
import { uploadPdf, searchPdfs, updatePdf, deletePdf } from '../services/api';

const AcademyDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ subject: '', className: '', school: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [loadingPdfs, setLoadingPdfs] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, pdf: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, pdf: null });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchMyPdfs();
  }, []);

  const fetchMyPdfs = async () => {
    setLoadingPdfs(true);
    try {
      const { data } = await searchPdfs({});
      let user;
      try {
        const userStr = localStorage.getItem('user');
        user = userStr ? JSON.parse(userStr) : null;
      } catch (parseError) {
        console.error('Failed to parse user:', parseError);
        user = null;
      }
      
      if (!user || !user._id) {
        setPdfs([]);
        return;
      }
      
      const myPdfs = data.data.filter(pdf => pdf.uploadedBy?._id === user._id);
      setPdfs(myPdfs);
    } catch (err) {
      console.error('Failed to load PDFs:', err);
      toast.error(err.response?.data?.message || 'Failed to load PDFs');
    } finally {
      setLoadingPdfs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a PDF file');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('pdf', file);
      data.append('subject', formData.subject);
      data.append('className', formData.className);
      data.append('school', formData.school);

      await uploadPdf(data);
      toast.success('PDF uploaded successfully!');
      setFormData({ subject: '', className: '', school: '' });
      setFile(null);
      document.getElementById('pdf-input').value = '';
      fetchMyPdfs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedData) => {
    if (!editModal?.pdf) {
      toast.error('No PDF selected');
      setActionLoading(false);
      return;
    }
    
    setActionLoading(true);
    try {
      await updatePdf(editModal.pdf._id, updatedData);
      toast.success('PDF updated successfully!');
      setEditModal({ isOpen: false, pdf: null });
      fetchMyPdfs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal?.pdf) {
      toast.error('No PDF selected');
      setActionLoading(false);
      return;
    }
    
    setActionLoading(true);
    try {
      await deletePdf(deleteModal.pdf._id);
      toast.success('PDF deleted successfully!');
      setDeleteModal({ isOpen: false, pdf: null });
      fetchMyPdfs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setActionLoading(false);
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
        <Sidebar role="academy" />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Upload PDF</h2>
              <p className="text-gray-600 mt-2">Share educational materials with students</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-8 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., Mathematics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <input
                      type="text"
                      required
                      value={formData.className}
                      onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., Grade 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                    <input
                      type="text"
                      required
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g., ABC School"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PDF File</label>
                  <input
                    id="pdf-input"
                    type="file"
                    accept=".pdf"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? <Loader /> : '📤 Upload PDF'}
                </button>
              </form>
            </div>

            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">My Uploaded PDFs</h3>
            </div>

            {loadingPdfs ? (
              <div className="flex justify-center py-12">
                <Loader />
              </div>
            ) : pdfs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pdfs.map((pdf) => (
                  <AcademyPdfCard
                    key={pdf._id}
                    pdf={pdf}
                    onEdit={(pdf) => setEditModal({ isOpen: true, pdf })}
                    onDelete={(pdf) => setDeleteModal({ isOpen: true, pdf })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No PDFs uploaded yet</h3>
                <p className="text-gray-600">Upload your first PDF to get started</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <EditModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, pdf: null })}
        onSave={handleEdit}
        pdf={editModal.pdf}
        loading={actionLoading}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, pdf: null })}
        onConfirm={handleDelete}
        title="Delete PDF"
        message="Are you sure you want to delete this PDF? This action cannot be undone."
        loading={actionLoading}
      />
    </div>
  );
};

export default AcademyDashboard;
