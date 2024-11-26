// ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import useAuth from "./useAuth";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        // Simulate async validation
        setTimeout(() => {
          setAuthenticated(true);
          setLoading(false);
        }, 500);
      } else {
        setLoading(false);
      }
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (!authenticated) return <Navigate to="/login" />;
 // Render the protected content if token exists
 return <> {children} </>;
};

export default ProtectedRoute;
