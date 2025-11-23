import { Router } from 'express';
import { getAdvisories, createAdvisory } from '../controllers/advisoryController';

const router = Router();

router.get('/', getAdvisories);
router.post('/', createAdvisory);

export default router;
