import express from 'express';
const router = express.Router();
import { createPost, getPosts, getPostBySlug } from '../controllers/postController';
import { protect, admin } from '../middlewares/authMiddleware';

// Post oluşturma (sadece admin)
router.route('/').post(protect, admin, createPost);

// Tüm postları listeleme
router.route('/').get(getPosts);

// Belirli bir postu getirme
router.route('/:slug').get(getPostBySlug);

export default router;