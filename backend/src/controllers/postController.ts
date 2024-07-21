import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Post from '../models/postModel';
import slugify from 'slugify';

const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, image } = req.body;
  const slug = slugify(title, { lower: true, strict: true });

  const post = new Post({
    user: new mongoose.Types.ObjectId(req.user?._id),
    title,
    content,
    image,
    slug,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find({}).populate('user', 'name profilePicture');
  res.json(posts);
});

const getPostBySlug = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('user', 'name profilePicture');
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, image } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;
    post.slug = slugify(post.title, { lower: true, strict: true });

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

const getUserPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find({ user: req.user?._id }).populate('user', 'name profilePicture');
  res.json(posts);
});

export { createPost, getPosts, getPostBySlug, updatePost, getUserPosts };
