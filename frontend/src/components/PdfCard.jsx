import { useState } from 'react';

const PdfCard = ({ pdf }) => {
  const [showModal, setShowModal] = useState(false);

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
              Uploaded: {new Date(pdf.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Preview PDF
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{pdf.subject}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`http://localhost:5000${pdf.fileUrl}`}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfCard;
