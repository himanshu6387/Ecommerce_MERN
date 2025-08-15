import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // mobile toggle
  const navigate = useNavigate();

  const fetchCartCount = async () => {
    try {
      const res = await API.get('/cart');
      console.log(res)
      setCartCount(res.data.cart?.items?.length || 0);
    } catch (err) {
      console.error('Failed to load cart', err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (user) fetchCartCount();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    setMenuOpen(false); // close mobile menu after logout
  };

  return (
    <nav className=" bg-gray-50 text-black shadow-2xl  sticky w-full z-50 top-0 start-0  dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">ECommerce</span>
        </Link>

        {/* Right side buttons */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="hidden md:block dark:text-white mr-3">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                           focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                           text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                           dark:focus:ring-blue-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                           focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center 
                           dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                SignUp
              </Link>
              <Link
                to="/login"
                className="ml-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                           focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center 
                           dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}

          {/* Mobile Toggle Button */}
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 
                       rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 
                       focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`${menuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg 
                         bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 
                         md:bg-white text-black dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 text-gray-900  font-semibold md:hover:text-blue-700" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 text-gray-900 font-semibold  md:hover:text-blue-700" onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 px-3 text-gray-900 font-semibold md:hover:text-blue-700" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
            {
              user ?
                <>
                  <li>
                    <Link to="/cart" className="block py-2 px-3 text-gray-900 font-semibold  md:hover:text-blue-700" onClick={() => setMenuOpen(false)}>
                      Cart({cartCount})
                    </Link>
                  </li>
                </> :
                <></>
            }
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
