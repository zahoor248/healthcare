// ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux"; // Import your state management library
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log("IsAuthenticated:", isAuthenticated); // Log the authentication status

//   if (!isAuthenticated) {
//     console.log("User not authenticated. Redirecting to login.");
//     // Redirect to the login page if the user is not authenticated
//     navigate("/login");
//     return null;
//   }

  return children;
};

export default ProtectedRoute;
