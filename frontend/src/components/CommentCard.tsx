import { IComment } from "../types/types";

interface CommentCardProps {
  comment: IComment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
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
  );
};

export default CommentCard;