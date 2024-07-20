import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  image?: string;
  slug: string;
}

const postSchema = new Schema<IPost>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
export { IPost };