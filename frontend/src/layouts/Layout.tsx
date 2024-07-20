import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const RequireAuth = () => {
  const user = useSelector((state:RootState) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  else {
    return (
      <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
    );
  }
}

export {RequireAuth, Layout};