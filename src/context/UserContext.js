import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { backendUrl } from '../utils/urls';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/user/get`);
      setUser(res.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };