// src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, List } from 'lucide-react'; // Optional icons using lucide-react

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 py-6">
          <div
            onClick={() => navigate('/admin/create-product')}
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-50 cursor-pointer transition"
          >
            <PlusCircle className="w-5 h-5 text-blue-600" />
            <span>Add Product</span>
          </div>
          <div
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-3 py-2 px-3 rounded hover:bg-blue-50 cursor-pointer transition"
          >
            <List className="w-5 h-5 text-blue-600" />
            <span>Manage Products</span>
          </div>
        </nav>
        <div className="px-4 py-4 border-t">
          <button className="flex items-center gap-2 text-red-500 hover:underline">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin</h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/admin/create-product')}
            className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Add Product</h2>
            <p className="text-gray-600 text-sm">Create and list new products with full details.</p>
          </div>

          <div
            onClick={() => navigate('/admin/products')}
            className="bg-white shadow-lg rounded-xl p-12 cursor-pointer hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Manage Products</h2>
            <p className="text-gray-600 text-sm">View, update, or delete listed products.</p>
          </div>

          {/* Future section */}
          <div className="bg-white shadow-lg rounded-xl p-6 opacity-50 cursor-not-allowed">
            <h2 className="text-lg font-semibold mb-2 text-gray-500">Analytics (Coming Soon)</h2>
            <p className="text-gray-400 text-sm">Visualize your product performance and trends.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
