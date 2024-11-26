import React, { useState } from "react";
import {useUser} from '../userContext.js';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = userData => {
      setUser(userData);
  };

  const logout = () => {
      setUser(null);
  };

  return (
      <useUser.Provider value={{ user, login, logout }}>
          {children}
      </useUser.Provider>
  );
};