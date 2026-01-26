import express from 'express';
import { bulkUploadProducts } from '../controllers/bulkUploadController.js';
const router = express.Router();
router.post('/', bulkUploadProducts);
export default router;
