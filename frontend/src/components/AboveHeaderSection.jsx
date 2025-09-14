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
import { Link } from "react-router-dom";

const AboveHeaderSection = ({ setSelectedCategory, setCarousel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "T-shirts",
    "Mugs",
    "Photo Frames",
    "Lamp",
    "Cushion",
    "Flowers",
    "Bags",
    "Keychain",
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setCarousel(false); // hide carousel when a category is selected
  };

  return (
    <header className="w-full">
      {/* TOP BAR */}
      <div className="bg-purple-700 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1">
            <FaPhoneAlt className="text-yellow-300" /> +91 7379353250
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <FaEnvelope className="text-yellow-300" /> allaroundaid@gmail.com
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
          <li className="hover:text-yellow-300 cursor-pointer text-lg">
            <Link to={"/"}>Home</Link>
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className="hover:text-yellow-300 cursor-pointer text-lg"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </li>
          ))}
          <li
            className="hover:text-yellow-300 cursor-pointer text-lg"
            onClick={() => handleCategoryClick("")}
          >
            View All
          </li>
        </ul>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="flex flex-col gap-4 px-6 py-4 sm:hidden bg-purple-800 absolute w-full z-50">
            {categories.map((cat) => (
              <li
                key={cat}
                className="hover:text-yellow-300 cursor-pointer text-lg"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </li>
            ))}
            <li
              className="hover:text-yellow-300 cursor-pointer text-lg"
              onClick={() => handleCategoryClick("")}
            >
              View All
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default AboveHeaderSection;
