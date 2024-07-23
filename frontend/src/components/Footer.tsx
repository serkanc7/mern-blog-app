import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Serkan Celik. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;