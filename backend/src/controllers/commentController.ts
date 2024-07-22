import asyncHandler from 'express-async-handler';
import Post, { IComment } from '../models/postModel';
import { Request, Response } from 'express';

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const { postId, content, rating } = req.body;
  const post = await Post.findById(postId);

  if (post) {
    const alreadyCommented = post.comments.find(
      (comment:IComment) => comment.user?.toString() === req.user?._id.toString()
    );

    if (alreadyCommented) {
      res.status(400).json({ message: 'Post already reviewed' });
      throw new Error('Post already reviewed');
    }

    const comment: IComment = {
      user: req.user?._id,
      content,
      rating,
      createdAt: new Date(),
    } as IComment;

    comment && post.comments.push(comment);
    post.averageRating =
      post.comments.reduce((acc, item) => item.rating + acc, 0) /
      post.comments.length;

    await post.save();
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(404).json({ message: 'Post not found' });
    throw new Error('Post not found');
  }
});