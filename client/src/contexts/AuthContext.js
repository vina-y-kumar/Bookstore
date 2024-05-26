// // src/contexts/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decoded = jwtDecode(token);
//       setUser(decoded.user);
//     }
//   }, []);

//   const register = async (formData) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/register', formData);
//       localStorage.setItem('token', res.data.token);
//       const decoded = jwtDecode(res.data.token);
//       setUser(decoded.user);
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
//   };

//   const login = async (formData) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//       localStorage.setItem('token', res.data.token);
//       const decoded = jwtDecode(res.data.token);
//       setUser(decoded.user);
//     } catch (error) {
//       console.error('Error logging in user:', error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common['x-auth-token'] = auth.token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
    setAuth({ ...auth, loading: false });
  }, [auth.token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
