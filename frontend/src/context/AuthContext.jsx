import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [wishlist,setWishlist] = useState([])
  const [showCarousel,setShowCarousel] = useState(true)
  const [cartCount, setCartCount] = useState(0);   // NEW: cart count

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
    }

    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    setWishlist(savedWishlist)
  }, []);


  // When Search Carousel Hide

  useEffect(()=>{
    if(search){
      setShowCarousel(false)
    }
    else{
      setShowCarousel(true)
    }
  },[search])

  // Fetch cart count when user logs in
  useEffect(() => {
    if (user) {
      API.get("/cart")
        .then(res => setCartCount(res.data.cart?.items?.length || 0))
        .catch(() => setCartCount(0));
    }
  }, [user]);


    const toggleWishlist = (product) => {
    let updatedWishlist;
    if (wishlist.find((p) => p._id === product._id)) {
      // remove
      updatedWishlist = wishlist.filter((p) => p._id !== product._id);
    } else {
      // add
      updatedWishlist = [...wishlist, product];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <AuthContext.Provider value={{ 
      user, setUser, search, setSearch, 
      cartCount, setCartCount,wishlist,toggleWishlist,showCarousel,setShowCarousel             // provide cartCount globally
    }}>
      {children}
    </AuthContext.Provider>
  );
};
