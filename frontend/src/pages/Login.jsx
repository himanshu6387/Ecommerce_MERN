import React, { useContext, useState } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', data);
      localStorage.setItem('token', res.data.token);
      setUser({ ...res.data.user, token: res.data.token });

      if (res.data.user.isAdmin) {
        toast.success('Admin LoggedIn Successfully..');
        navigate('/admin');
      } else {
        toast.success('User LoggedIn Successfully...');
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 relative">
      {/* 🔹 Overlay Loader with GIF */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-opacity-70 z-50">
          <img
            src="https://vmsmobile.azurewebsites.net/images/Spinner-3.gif"
            alt="Loading..."
            className="w-16 h-16"
          />
          <p className=' text-center text-green-500 mt-2 text-xl font-bold bg-white p-3 rounded-md text-shadow-amber-300'>Logging...</p>
        </div>
      )}

      <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl relative z-10">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg')"
          }}
        ></div>

        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          {/* Email */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <a href="#" className="text-xs text-gray-500">Forget Password?</a>
            </div>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            />
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button
              onClick={loginHandler}
              disabled={loading}
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Login
            </button>
          </div>

          {/* Signup link */}
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to={'/signup'} className="text-xs text-gray-500 uppercase">or sign up</Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
