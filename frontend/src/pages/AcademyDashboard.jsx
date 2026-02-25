import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { uploadPdf } from '../services/api';
import Loader from '../components/Loader';

const AcademyDashboard = () => {
  const [formData, setFormData] = useState({ subject: '', className: '', school: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file) => {
    if (!file) return 'Please select a file';
    if (file.type !== 'application/pdf') return 'Only PDF files are allowed';
    if (file.size > 10 * 1024 * 1024) return 'File size must be less than 10MB';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const fileError = validateFile(file);
    if (fileError) {
      setError(fileError);
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
      setSuccess('PDF uploaded successfully!');
      setFormData({ subject: '', className: '', school: '' });
      setFile(null);
      
      const input = document.getElementById('pdf-input');
      if (input) input.value = '';
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const fileError = validateFile(droppedFile);
      if (fileError) {
        setError(fileError);
      } else {
        setFile(droppedFile);
        setError('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="academy" />
        
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Upload PDF</h2>
              <p className="text-gray-600 mt-2">Share educational materials with students</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div role="alert" className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div role="alert" className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <div>
                  <label htmlFor="subject-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Name
                  </label>
                  <input
                    id="subject-input"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., Mathematics"
                  />
                </div>

                <div>
                  <label htmlFor="className-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Class Name
                  </label>
                  <input
                    id="className-input"
                    type="text"
                    required
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., Grade 10"
                  />
                </div>

                <div>
                  <label htmlFor="school-input" className="block text-sm font-medium text-gray-700 mb-2">
                    School Name
                  </label>
                  <input
                    id="school-input"
                    type="text"
                    required
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="e.g., ABC High School"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload PDF File
                  </label>
                  <div 
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                      dragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="pdf-input" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input
                            id="pdf-input"
                            type="file"
                            accept=".pdf,application/pdf"
                            required
                            onChange={(e) => {
                              const selectedFile = e.target.files[0];
                              if (selectedFile) {
                                const fileError = validateFile(selectedFile);
                                if (fileError) {
                                  setError(fileError);
                                  e.target.value = '';
                                } else {
                                  setFile(selectedFile);
                                  setError('');
                                }
                              }
                            }}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                      {file && (
                        <p className="text-sm text-indigo-600 font-medium mt-2">
                          Selected: {file.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  aria-disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? <Loader /> : <><span aria-hidden="true">📤</span> Upload PDF</>}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AcademyDashboard;
