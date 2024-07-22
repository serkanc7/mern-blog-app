import express from 'express';
import { registerUser, authUser, updateUserProfile } from '../controllers/authController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.put('/profile', protect, updateUserProfile);

export default router;