import express from 'express';
const router = express.Router();
import { createPost, getPosts, getPostBySlug, getUserPosts, updatePost } from '../controllers/postController';
import { protect, admin } from '../middlewares/authMiddleware';

router.route('/').post(protect, admin, createPost);
router.route('/').get(getPosts);
router.route('/user').get(protect, admin, getUserPosts);
router.route('/:slug').get(getPostBySlug);
router.route('/:id').put(protect, admin, updatePost);

export default router;