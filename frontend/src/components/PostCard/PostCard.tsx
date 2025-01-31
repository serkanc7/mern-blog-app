import { Link } from "react-router-dom";
import { IPost } from "../../types/types";

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div key={post._id} className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold" data-testid="post-title">
        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-gray-600" data-testid="post-user">
        by {post.user.name} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2" data-testid="post-content">{post.content.substring(0, 100)}...</p>
      <Link to={`/posts/${post.slug}`} className="text-blue-500 hover:underline mt-4 block" data-testid="post-read-more">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;