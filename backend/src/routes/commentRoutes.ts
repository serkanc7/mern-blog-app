import express from 'express';
import { addComment } from '../controllers/commentController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/add', protect, addComment);

export default router;