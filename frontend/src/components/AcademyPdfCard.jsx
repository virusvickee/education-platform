const AcademyPdfCard = ({ pdf, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Unknown' : date.toLocaleDateString();
  };

  return (
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
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(pdf)}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(pdf)}
            className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademyPdfCard;
