import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/Admindashboard';
import UserDashboard from './pages/UserDashboard';
import Cart from './pages/Cart';
import { AuthContext, AuthProvider } from './context/AuthContext';
import CreateProduct from './pages/CreateProduct';
import GetAllProducts from './pages/GetAllProduct';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import { Toaster } from 'react-hot-toast'
import Contact from './pages/Contact';
import About from './pages/About';
import Carousel from './pages/Carousel';
import AboveHeaderSection from './components/AboveHeaderSection';
import PopularCategories from './pages/PopularCategories';
import Wishlist from './pages/Wishlist';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { useContext } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Abhay from './components/Abhay';


function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AboveHeaderSection />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/abhay" element={<Abhay />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Only logged-in users can access */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/create-product" element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          } />

          <Route path="/admin/products" element={
            <ProtectedRoute>
              <GetAllProducts />
            </ProtectedRoute>
          } />

          <Route path="/shop" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } />

          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="/wishlist" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />

          {/* Public routes */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/categories" element={<PopularCategories />} />

          {/* Forgot + Reset Password */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
