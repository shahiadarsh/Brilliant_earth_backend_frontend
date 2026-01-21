import express from 'express';
import multer from 'multer';
import { bulkUploadCSV } from '../controllers/bulkUploadController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, restrictTo('admin'), upload.single('file'), bulkUploadCSV);

export default router;
