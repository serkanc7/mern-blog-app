export type ObjectId = string;

export interface IUser {
  _id: ObjectId;
  name: string;
  profilePicture?: string;
  isAdmin: boolean
}

export interface IComment {
  _id?: ObjectId;
  user: IUser;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date
}

export interface IPost {
  _id?: ObjectId; 
  user: IUser;
  title: string;
  content: string;
  image?: string;
  slug: string;
  comments: IComment[];
  averageRating: number;
  createdAt: Date,
  updatedAt: Date
}