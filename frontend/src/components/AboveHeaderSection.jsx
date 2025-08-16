import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import Navbar from "../pages/Navbar";

const AboveHeaderSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      {/* TOP BAR */}
      <div className="bg-purple-700 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <FaPhoneAlt className="text-yellow-300" /> +91 9876543210
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <FaEnvelope className="text-yellow-300" /> info@giftyonline.com
          </span>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <FaFacebookF className="cursor-pointer hover:text-yellow-300" />
          <FaTwitter className="cursor-pointer hover:text-yellow-300" />
          <FaYoutube className="cursor-pointer hover:text-yellow-300" />
        </div>
      </div>

      <Navbar />

      {/* CATEGORY MENU */}
      <nav className="bg-purple-700 text-white text-sm relative">
        {/* Hamburger for mobile */}
        <div className="flex justify-between items-center px-6 py-4 sm:hidden">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 px-6 py-5">
          <li className="hover:text-yellow-300 cursor-pointer text-lg">Home</li>
          <li className="text-yellow-400 font-semibold cursor-pointer text-lg">
            T-shirts
          </li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">Mugs</li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">
            Photo Frames
          </li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">Lamp</li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">
            Cushion
          </li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">
            Flowers
          </li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">Bags</li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">
            Keychain
          </li>
          <li className="hover:text-yellow-300 cursor-pointer text-lg">
            View All
          </li>
        </ul>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="flex flex-col gap-4 px-6 py-4 sm:hidden bg-purple-800 absolute w-full z-50">
            <li className="hover:text-yellow-300 cursor-pointer text-lg">Home</li>
            <li className="text-yellow-400 font-semibold cursor-pointer text-lg">
              T-shirts
            </li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">Mugs</li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">
              Photo Frames
            </li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">Lamp</li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">
              Cushion
            </li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">
              Flowers
            </li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">Bags</li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">
              Keychain
            </li>
            <li className="hover:text-yellow-300 cursor-pointer text-lg">
              View All
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default AboveHeaderSection;
