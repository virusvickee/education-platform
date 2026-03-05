import express from 'express';
import { uploadPdf, searchPdfs, getPdfById, updatePdf, deletePdf } from '../controllers/pdfController.js';
import { protect } from '../middleware/authMiddleware.js';
import { academyOnly } from '../middleware/roleMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', protect, academyOnly, upload.single('pdf'), uploadPdf);
router.get('/search', protect, searchPdfs);
router.get('/:id', protect, getPdfById);
router.put('/:id', protect, academyOnly, updatePdf);
router.delete('/:id', protect, academyOnly, deletePdf);

export default router;
