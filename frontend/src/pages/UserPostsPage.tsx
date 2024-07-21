import  { useState } from 'react';
import { useGetUserPostsQuery, useUpdatePostMutation } from '../features/api/apiSlice';
import { Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Modal from 'react-modal';

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

interface IFormInputs {
  title: string;
  content: string;
  image?: string;
}

Modal.setAppElement('#root');

const UserPostsPage: React.FC = () => {
  const { data: posts = [], error, isLoading } = useGetUserPostsQuery({});
  const [updatePost] = useUpdatePostMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.string().url('Image must be a valid URL'),
  });

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const openModal = (post: Post) => {
    setSelectedPost(post);
    reset({
      title: post.title,
      content: post.content,
      image: post.image
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPost(null);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (selectedPost) {
      await updatePost({ id: selectedPost._id, ...data });
      closeModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl mb-6">My Posts</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error</p>}
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
            <button
              className="bg-green-500 text-white py-1 px-2 rounded mt-2"
              onClick={() => openModal(post)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Post"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-2xl mb-6">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.content ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.image ? 'border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserPostsPage;
