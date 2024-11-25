/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type AuthContextType = {
  user: any;
  token: string | null;
  isAuthenticated: boolean; // Add this
  login: (user: any, token: string) => void;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
