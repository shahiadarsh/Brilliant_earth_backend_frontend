
import express from 'express';
import { bulkUploadProducts } from '../controllers/bulkUploadController.js';
import uploadCsv from '../../public/middleware/csvUploadMiddleware.js';
import { protect, restrictTo } from '../../public/middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

/**
 * @route   POST /api/v1/admin/bulk-upload
 * @desc    Bulk upload products via CSV
 * @access  Admin
 */
router.post('/', uploadCsv.single('file'), bulkUploadProducts);

export default router;
