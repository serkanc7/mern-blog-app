import React from "react";
import { useGetPostsQuery } from "../features/api/apiSlice";
import { IPost } from "../types/types";
import PostCard from "../components/PostCard";

const HomePage: React.FC = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: IPost) => (
          <div key={post._id} className="mb-4 border-b pb-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
