import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';


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
          element: <RegisterPage />
        }
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
