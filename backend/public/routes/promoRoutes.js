import express from 'express';
import { getActivePromos } from '../controllers/promoController.js';

const router = express.Router();

router.get('/', getActivePromos);

export default router;
