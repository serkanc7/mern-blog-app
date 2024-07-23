import { useGetPostsQuery } from '../features/api/apiSlice';
import { IPost } from '../types/types';
import PostCard from '../components/PostCard';

const PostListPage: React.FC = () => {
  const { data: posts = [], error, isLoading } = useGetPostsQuery({});

  let errorMessage = null;

  if (error) {
    if ('status' in error) {
      errorMessage = (
        <div>
          <p>Error Status: {error.status}</p>
          <p>Error Data: {JSON.stringify(error.data)}</p>
        </div>
      );
    } else {
      errorMessage = <p>{error.message}</p>;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl mb-6">Posts</h2>
      {isLoading && <p>Loading...</p>}
      {errorMessage}
      <ul>
        {posts.map((post: IPost) => (
          <li key={post._id} className="mb-4 border-b pb-4">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListPage;