import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">My Blog</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/posts" className="hover:underline">Posts</Link>
          {user ? (
            <> 
              {user.isAdmin && <Link to="/add-new-post" className='hover:underline'>Add Post</Link>}
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="md:hidden bg-gray-800 text-white">
          <Link to="/posts" className="block px-4 py-2 hover:underline" onClick={() => setIsOpen(false)}>Posts</Link>
          {user ? (
            <>
               {user.isAdmin && <Link to="/add-new-post" className='hover:underline'>Add Post</Link>}
              <Link to="/profile" className="block px-4 py-2 hover:underline" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="block px-4 py-2 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 hover:underline" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="block px-4 py-2 hover:underline" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
