import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Layout, RequireAuth }  from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import ProfilePage from './pages/ProfilePage';
import AddPostPage from './pages/AddPostPage';
import PostListPage from './pages/PostListPage';


function App() {

  const user = useSelector((state:RootState) => state.auth.user);

  console.log(user);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: user ? <Navigate to="/" /> : <LoginPage />,
        },
        {
          path: "/register",
          element: user ? <Navigate to="/" /> : <RegisterPage />
        },
        {
          path: "/posts",
          element: <PostListPage />
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />
        },
        {
          path: "/add-new-post",
          element: <AddPostPage />
        }
      ], 
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
