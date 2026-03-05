import Pdf from '../models/Pdf.js';
import redis from '../config/redis.js';
import cloudinary from '../config/cloudinary.js';

const clearCache = async (subject, className, school) => {
  const s = subject || 'all';
  const c = className || 'all';
  const sc = school || 'all';
  const keys = [
    `pdf:${s}:${c}:${sc}`,
    `pdf:all:all:all`,
    `pdf:${s}:all:all`,
    `pdf:all:${c}:all`,
    `pdf:all:all:${sc}`
  ];
  await Promise.all(keys.map(key => redis.del(key)));
};

export const uploadPdf = async (req, res) => {
  try {
    const { subject, className, school } = req.body;

    if (!subject || !className || !school) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide subject, className, and school' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload a PDF file' 
      });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'education-pdfs' },
        (error, result) => error ? reject(error) : resolve(result)
      ).end(req.file.buffer);
    });

    const pdf = await Pdf.create({
      subject,
      className,
      school,
      fileUrl: result.secure_url,
      cloudinaryId: result.public_id,
      uploadedBy: req.user._id
    });

    await pdf.populate('uploadedBy', '-password');
    await clearCache(subject, className, school);

    res.status(201).json({ success: true, data: pdf });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchPdfs = async (req, res) => {
  try {
    const { subject, className, school } = req.query;
    const query = {};
    if (subject) query.subject = subject;
    if (className) query.className = className;
    if (school) query.school = school;

    const cacheKey = `pdf:${subject || 'all'}:${className || 'all'}:${school || 'all'}`;
    const cachedData = await redis.get(cacheKey);
    
    if (cachedData) {
      console.log(`Cache HIT: ${cacheKey}`);
      return res.status(200).json({ success: true, source: 'cache', data: JSON.parse(cachedData) });
    }

    console.log(`Cache MISS: ${cacheKey}`);
    const pdfs = await Pdf.find(query).populate('uploadedBy', '-password').sort({ createdAt: -1 });
    await redis.setex(cacheKey, 300, JSON.stringify(pdfs));

    res.status(200).json({ success: true, source: 'database', data: pdfs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPdfById = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id).populate('uploadedBy', '-password');
    
    if (!pdf) {
      return res.status(404).json({ success: false, message: 'PDF not found' });
    }

    res.status(200).json({ success: true, data: pdf });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid PDF id' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePdf = async (req, res) => {
  try {
    const { subject, className, school } = req.body;
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ success: false, message: 'PDF not found' });
    }

    if (pdf.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this PDF' });
    }

    const oldData = { subject: pdf.subject, className: pdf.className, school: pdf.school };
    
    if (subject) pdf.subject = subject;
    if (className) pdf.className = className;
    if (school) pdf.school = school;

    await pdf.save();
    await pdf.populate('uploadedBy', '-password');
    
    await clearCache(oldData.subject, oldData.className, oldData.school);
    await clearCache(pdf.subject, pdf.className, pdf.school);

    res.status(200).json({ success: true, data: pdf });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid PDF id' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ success: false, message: 'PDF not found' });
    }

    if (pdf.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this PDF' });
    }

    await pdf.deleteOne();
    
    if (pdf.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(pdf.cloudinaryId, { resource_type: 'raw' });
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion failed:', cloudinaryError);
      }
    }

    await clearCache(pdf.subject, pdf.className, pdf.school);

    res.status(200).json({ success: true, message: 'PDF deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid PDF id' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
