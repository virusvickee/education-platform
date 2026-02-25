import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  className: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  school: {
    type: String,
    required: [true, 'School name is required'],
    trim: true
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster search queries
pdfSchema.index({ subject: 1, className: 1, school: 1 });

export default mongoose.model('Pdf', pdfSchema);
