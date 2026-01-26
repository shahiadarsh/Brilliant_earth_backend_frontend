import express from 'express';
import { searchLooseStones, getLooseStoneFilters } from '../controllers/looseStoneController.js';
import { getCompatibleStones, getCompatibleSettings, validatePairing } from '../controllers/builderController.js';

const router = express.Router();

// Search
router.get('/loose-stones', searchLooseStones);
router.get('/loose-stones/filters', getLooseStoneFilters);

// Builder
router.get('/builder/compatible-stones/:ringSlug', getCompatibleStones);
router.get('/builder/compatible-settings/:stoneSlug', getCompatibleSettings);
router.post('/builder/validate', validatePairing);

export default router;
