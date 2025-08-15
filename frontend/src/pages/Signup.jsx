import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSignup = async () => {
    try {
      await API.post('/auth/signup', form);
      toast.success('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/social-media-marketing-mobile-phone-concept_23-2148431747.jpg?t=st=1753682816~exp=1753686416~hmac=3a2dce3bdfaa6e0cab16c2c290e44a08bce90638f6bf8db0a73d50b1cba73fe4&w=1380')"
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Create an account</p>

          <button className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path fill="#FFC107" d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192..." />
                <path fill="#FF3D00" d="M5.25497 12.2425L10.7308..." />
                <path fill="#4CAF50" d="M20 36.6667C24.305..." />
                <path fill="#1976D2" d="M36.3425 16.7358H35..." />
              </svg>
            </div>
            <span className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign up with Google</span>
          </button>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase">or use your email</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              placeholder="John Doe"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              placeholder="********"
            />
          </div>

          <div className="mt-8">
            <button
              onClick={handleSignup}
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Register
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="/" className="text-xs text-gray-500 uppercase">Already have an account?</a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
