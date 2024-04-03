import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loginUser) => {
    setUser(loginUser);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ user, isLoggedIn, handleLogin, handleLogout }}>{props.children}</AuthContext.Provider>;
};
