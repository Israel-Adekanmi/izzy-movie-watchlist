/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

export type AuthContextType = {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check if the user is authenticated
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: any, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
  };

  const value: AuthContextType = { user, token, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthProvider };
