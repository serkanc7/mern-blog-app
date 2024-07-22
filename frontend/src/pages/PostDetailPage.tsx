import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useGetPostBySlugQuery, useAddCommentMutation } from '../features/api/apiSlice';
import { IComment } from '../types/types';


interface IFormInputs {
  content: string;
  rating: number;
}

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, error, isLoading } = useGetPostBySlugQuery(slug!);
  const [addComment] = useAddCommentMutation();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    rating: Yup.number().required('Rating is required').min(1).max(5),
  });

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const result = await addComment({ postId: post._id, ...data }).unwrap();
      setResponseMessage(result.message);
      reset();
    } catch (error:any) {
      if (error.status === 400) {
        setResponseMessage('You have already reviewed this post.');
      } else {
        setResponseMessage('Failed to add comment. Please try again.');
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-4">{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} className="mb-4" />}
      <div className="text-lg mb-4">{post.content}</div>
      <div className="flex items-center mt-2 mb-4">
        {post.user.profilePicture && (
          <img
            src={post.user.profilePicture}
            alt={post.user.name}
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <span>{post.user.name}</span>
      </div>
      <div className="text-lg mb-4">Average Rating: {post.averageRating.toFixed(1)}</div>

      <h2 className="text-2xl mb-4">Comments</h2>
      {post.comments.map((comment: IComment) => (
        <div key={comment._id} className="mb-4 border-b pb-4">
          <div className="flex items-center mb-2">
            {comment.user.profilePicture && (
              <img
                src={comment.user.profilePicture}
                alt={comment.user.name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <span>{comment.user.name}</span>
          </div>
          <div className="mb-2">{comment.content}</div>
          <div className="text-sm text-gray-600">Rating: {comment.rating}</div>
        </div>
      ))}

      {responseMessage && <div className="mb-4 text-red-500">{responseMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="mb-4">
          <label className="block text-gray-700">Comment</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.content ? 'border-red-500' : ''
                }`}
              />
            )}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.rating ? 'border-red-500' : ''
                }`}
                min="1"
                max="5"
              />
            )}
          />
          {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit Comment
        </button>
      </form>
    </div>
  );
};

export default PostDetailPage;