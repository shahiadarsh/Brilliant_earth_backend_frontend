import express from 'express';
import {
    getShapes,
    getShape,
    createShape,
    updateShape,
    deleteShape
} from '../controllers/shapeController.js';

const router = express.Router();

// Public routes
router.get('/', getShapes);
router.get('/:id', getShape);

// Admin routes (add authentication middleware as needed)
router.post('/', createShape);
router.put('/:id', updateShape);
router.delete('/:id', deleteShape);

export default router;
