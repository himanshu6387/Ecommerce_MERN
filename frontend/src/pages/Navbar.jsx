import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { FaUser, FaHeart, FaShoppingCart, FaBars, FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import logo from '../assets/logo.png'

const Navbar = () => {
  const { user, setUser, setSearch, cartCount,wishlist } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between py-3 px-4">

        {/* Left - Logo & Hamburger */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img width={90} style={{borderRadius:'50%'}} src={logo} alt="" />
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-700 text-2xl md:hidden"
          >
            <FaBars />
          </button>
        </div>

        {/* Middle - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-6">
          {/* Search Bar */}
          <div className="flex flex-1 max-w-xl mx-4">
            <select className="border border-gray-400 text-gray-600 rounded-l px-2 text-sm">
              <option>T-shirts (6)</option>
              <option>Mugs</option>
              <option>Photo Frames</option>
            </select>
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 border-t border-b border-gray-500 px-3 text-sm"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="bg-purple-700 text-white px-5 h-11 rounded-r">
              <FiSearch />
            </button>
          </div>
        </div>


        {/* Right - Account, Wishlist, Cart */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className=" bi bi-person-fill-add text-4xl text-purple-800"></span>
            <div className="text-sm">
              {user ? (
                <>
                  <span>{user.name}</span>
                  <br />
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <span>Account</span>
                  <br />
                  <Link to="/login" className="hover:text-purple-700">
                    Login
                  </Link>
                  <Link to="/signup" className="hover:text-purple-700">
                    /Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <span className=" bi bi-heart text-2xl text-purple-800"></span>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-1 rounded">
              {wishlist.length || 0}
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className=" bi bi-cart3 text-2xl text-purple-800"></span>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-1 rounded">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex w-full border rounded-lg overflow-hidden">
            <select className="px-3 border-r outline-none">
              <option>All</option>
              <option>Gifts</option>
              <option>Flowers</option>
            </select>
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 outline-none"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="bg-purple-700 text-white px-4 flex items-center justify-center">
              <FaSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
