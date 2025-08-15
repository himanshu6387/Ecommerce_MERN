import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/Admindashboard';
import UserDashboard from './pages/UserDashboard';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import CreateProduct from './pages/CreateProduct';
import GetAllProducts from './pages/GetAllProduct';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import {Toaster} from 'react-hot-toast'
import Contact from './pages/Contact';
import About from './pages/About';
import Carousel from './pages/Carousel';
import AboveHeaderSection from './components/AboveHeaderSection';
import PopularCategories from './pages/PopularCategories';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AboveHeaderSection/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/products" element={<GetAllProducts />} />
          <Route path="/shop" element={<UserDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/categories" element={<PopularCategories/>} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
