import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPostBySlugQuery,
} from "../features/api/apiSlice";
import { IComment } from "../types/types";
import CommentCard from "../components/CommentCard";
import PostForm from "../components/PostForm";

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, error, isLoading } = useGetPostBySlugQuery(slug!);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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
      <div className="text-lg mb-4">
        Average Rating: {post.averageRating.toFixed(1)}
      </div>

      <h2 className="text-2xl mb-4">Comments</h2>
      {post.comments.map((comment: IComment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}

      {responseMessage && (
        <div className="mb-4 text-red-500">{responseMessage}</div>
      )}

      <PostForm postId={post._id} onSubmitSuccess={setResponseMessage} />
    </div>
  );
};

export default PostDetailPage;