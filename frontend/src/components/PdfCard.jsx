import { useState, useRef, useEffect } from 'react';

const PdfCard = ({ pdf }) => {
  const [showModal, setShowModal] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    if (showModal && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        const focusableElements = closeButtonRef.current?.parentElement?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{pdf.subject}</h3>
            <p className="text-sm text-gray-500 mt-1">Class: {pdf.className}</p>
          </div>
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              <span className="font-medium">School:</span> {pdf.school}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Uploaded: {formatDate(pdf.createdAt)}
            </p>
          </div>
          <button
            ref={triggerRef}
            onClick={() => setShowModal(true)}
            className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Preview PDF
          </button>
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 id="modal-title" className="text-lg font-semibold text-gray-800">{pdf.subject}</h3>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                aria-label="Close preview"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${API_BASE_URL}${pdf.fileUrl}`}
                className="w-full h-full"
                title="PDF Preview"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfCard;
