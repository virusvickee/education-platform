import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfCard = ({ pdf }) => {
  const [showModal, setShowModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
  };

  const closeModal = () => {
    setShowModal(false);
    setPageNumber(1);
    setLoading(true);
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
            onClick={() => setShowModal(true)}
            className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            👁️ Preview PDF
          </button>
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{pdf.subject}</h3>
                <p className="text-sm text-gray-500">{pdf.className} - {pdf.school}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-auto flex flex-col items-center p-4 bg-gray-100">
              {loading && <div className="text-gray-600 py-8">Loading PDF...</div>}
              <Document
                file={pdf.fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error('Error loading PDF:', error)}
                loading={<div className="text-gray-600 py-8">Loading PDF...</div>}
              >
                <Page 
                  pageNumber={pageNumber} 
                  renderTextLayer={true} 
                  renderAnnotationLayer={true}
                  className="shadow-lg"
                />
              </Document>
            </div>

            {numPages && (
              <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between">
                <button
                  onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                  disabled={pageNumber <= 1}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                >
                  ← Previous
                </button>
                <span className="text-sm font-medium text-gray-700">
                  Page {pageNumber} of {numPages}
                </span>
                <button
                  onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                  disabled={pageNumber >= numPages}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PdfCard;
