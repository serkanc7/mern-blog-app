import { useGetPostsQuery } from '../features/api/apiSlice';
import { Link } from 'react-router-dom';

interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  slug: string;
  user: {
    name: string;
    profilePicture?: string;
  };
}

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
        {posts.map((post: Post) => (
          <li key={post._id} className="mb-4 border-b pb-4">
            <Link to={`/posts/${post.slug}`} className="text-xl text-blue-500">
              {post.title}
            </Link>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt={post.title} className="mt-2" />}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostListPage;