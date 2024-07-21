import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAddPostMutation } from '../features/api/apiSlice';
import { useNavigate } from 'react-router';

interface IFormInputs {
  title: string;
  content: string;
  image?: string;
}

const AddPostPage: React.FC = () => {
  const [addPost] = useAddPostMutation();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.string().url('Image must be a valid URL'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
    }
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    await addPost(data);
    navigate('posts');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl mb-6">Add Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <Controller
            name="title"
            control={control}
            defaultValue="" // Varsayılan değer ekleyin
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
            defaultValue="" // Varsayılan değer ekleyin
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
            defaultValue="" // Varsayılan değer ekleyin
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
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;