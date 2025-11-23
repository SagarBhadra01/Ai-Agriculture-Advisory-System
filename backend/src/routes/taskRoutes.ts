import { Router } from 'express';
import { getTasks, toggleTask } from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.patch('/:id', toggleTask);

export default router;
