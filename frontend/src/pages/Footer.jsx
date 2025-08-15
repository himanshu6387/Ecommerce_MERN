import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white">
      {/* Newsletter */}
      <div className="border-b border-purple-500 py-6 px-4 flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex items-center gap-3">
           <span className=' bi bi-envelope-arrow-down text-5xl'></span>
          <div>
            <h3 className="font-semibold text-lg">Subscribe Newsletter</h3>
            <p className="text-sm">Don't miss out thousands of great deals & promotions</p>
          </div>
        </div>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email here..."
            className="px-4 py-2 rounded-l-lg  text-black w-72 border-1 border-white  bg-white  "
          />
          <button className="bg-purple-900 px-4 py-2 rounded-r-lg border-1 border-white hover:bg-purple-800">
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Logo & About */}
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold flex items-center">
            <span className="text-yellow-300 mr-1">gifty</span>
            <span className="text-sm font-normal ml-1">GIFT SHOP</span>
          </h2>
          <p className="mt-2 text-sm">
            GIFTY – Happy Gift Store <br />
            Making Every Gift Uniquely Yours – Personalized with Love!
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebookF className="hover:text-yellow-300 cursor-pointer" />
            <FaInstagram className="hover:text-yellow-300 cursor-pointer" />
            <FaYoutube className="hover:text-yellow-300 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-300 cursor-pointer" />
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/about'} className="hover:underline">About Us</Link></li>
            <li><Link to={'/shop'} className="hover:underline">Our Products</Link></li>
            <li><Link className="hover:underline">Affiliate Program</Link></li>
            <li><Link className="hover:underline">Privacy Policy</Link></li>
            <li><Link to={'/contact'} className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="font-bold mb-3">Top Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to={'/'} className="hover:underline">T-shirts</Link></li>
            <li><Link className="hover:underline">Calendars</Link></li>
            <li><Link className="hover:underline">Name Plates</Link></li>
            <li><Link className="hover:underline">Photo Frames</Link></li>
            <li><Link className="hover:underline">Printed Cushion</Link></li>
          </ul>
        </div>

        {/* Help & Guide */}
        <div>
          <h3 className="font-bold mb-3">Help & Guide</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">How to Buy</a></li>
            <li><a href="#" className="hover:underline">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:underline">Product Policy</a></li>
            <li><a href="#" className="hover:underline">How to Return</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold mb-3">Contact</h3>
          <p className="flex items-center gap-2 text-sm"><BsTelephoneFill /> +91 9876543210</p>
          <p className="flex items-center gap-2 text-sm"><FaWhatsapp /> +91 9876543210</p>
          <p className="flex items-center gap-2 text-sm"><MdEmail /> info@giftyonline.com</p>
          <p className="flex items-center gap-2 text-sm"><MdLocationOn /> 14 SR Road, Mumbai, 400001</p>
        </div>
      </div>

      {/* Back to top */}
      <div className="flex justify-end py-6 px-10">
        <button
          className="bg-white text-black px-4 py-2 rounded-full flex gap-2 hover:bg-gray-200"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
