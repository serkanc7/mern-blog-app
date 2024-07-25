import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostCard from './PostCard';
import { IPost } from '../../types/types';

const post: IPost = {
  _id: '1',
  user: {
    _id: '1',
    name: 'Test User',
    isAdmin: false,
    profilePicture: '',
  },
  title: 'Test Post',
  content: 'This is a test post content.',
  slug: 'test-post',
  comments: [],
  averageRating: 4,
  createdAt: new Date(),
  updatedAt: new Date()
};

test('renders PostCard with post data', () => {
  render(
    <BrowserRouter>
      <PostCard post={post} />
    </BrowserRouter>
  );

  expect(screen.getByTestId('post-title')).toHaveTextContent(/Test Post/i);
  expect(screen.getByTestId('post-user')).toHaveTextContent(/by Test User/i);
  expect(screen.getByTestId('post-content')).toHaveTextContent(/This is a test post content/i);
  expect(screen.getByTestId('post-read-more')).toBeInTheDocument();
});