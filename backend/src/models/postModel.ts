import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  user: mongoose.Schema.Types.ObjectId | undefined;
  content: string;
  rating: number;
  createdAt: Date;
}

interface IPost extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  image?: string;
  slug: string;
  comments: IComment[];
  averageRating: number;
}

const commentSchema = new Schema<IComment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const postSchema = new Schema<IPost>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    slug: { type: String, required: true, unique: true },
    comments: [commentSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
export { IPost, IComment };