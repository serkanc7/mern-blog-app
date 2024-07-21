import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostBySlugQuery } from '../features/api/apiSlice';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, error, isLoading } = useGetPostBySlugQuery(slug!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-4">{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} className="mb-4" />}
      <div className="text-lg mb-4">{post.content}</div>
      <div className="flex items-center mt-2">
        {post.user.profilePicture && (
          <img
            src={post.user.profilePicture}
            alt={post.user.name}
            className="w-10 h-10 rounded-full mr-4"
          />
        )}
        <span>{post.user.name}</span>
      </div>
    </div>
  );
};

export default PostDetailPage;