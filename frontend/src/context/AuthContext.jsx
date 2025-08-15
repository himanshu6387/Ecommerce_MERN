import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [search,setSearch] = useState('')
  // console.log(search)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,search,setSearch }}>
      {children}
    </AuthContext.Provider>
  );
};
