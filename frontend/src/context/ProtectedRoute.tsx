import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        // Decode the token to check its expiration
        const decodedToken = jwtDecode<JwtPayload>(token);
        const isTokenExpired =
          decodedToken.exp && decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
          // If expired, clear the token and redirect to login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("authUser");
          setAuthenticated(false);
        } else {
          // If valid, set authenticated to true
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Remove invalid tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authUser");
        setAuthenticated(false);
      }
    }

    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;
  
  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
