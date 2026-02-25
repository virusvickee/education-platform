import Pdf from '../models/Pdf.js';
import redis from '../config/redis.js';

// @desc    Upload PDF
// @route   POST /api/pdf/upload
// @access  Private (Academy only)
export const uploadPdf = async (req, res) => {
  try {
    const { subject, className, school } = req.body;

    // Validate required fields
    if (!subject || !className || !school) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide subject, className, and school' 
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload a PDF file' 
      });
    }

    // Create PDF document
    const pdf = await Pdf.create({
      subject,
      className,
      school,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id
    });

    // Populate uploadedBy field
    await pdf.populate('uploadedBy', '-password');

    // Clear relevant cache
    const cacheKey = `pdf:${subject}:${className}:${school}`;
    await redis.del(cacheKey);

    res.status(201).json({
      success: true,
      data: pdf
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Search PDFs
// @route   GET /api/pdf/search
// @access  Private (Authenticated)
export const searchPdfs = async (req, res) => {
  try {
    const { subject, className, school } = req.query;

    // Build query object
    const query = {};
    if (subject) query.subject = subject;
    if (className) query.className = className;
    if (school) query.school = school;

    // Generate cache key
    const cacheKey = `pdf:${subject || 'all'}:${className || 'all'}:${school || 'all'}`;

    // Check cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: 'cache',
        data: JSON.parse(cachedData)
      });
    }

    // Fetch from database
    const pdfs = await Pdf.find(query)
      .populate('uploadedBy', '-password')
      .sort({ createdAt: -1 });

    // Store in cache with 60 seconds expiry
    await redis.setex(cacheKey, 60, JSON.stringify(pdfs));

    res.status(200).json({
      success: true,
      source: 'database',
      data: pdfs
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
