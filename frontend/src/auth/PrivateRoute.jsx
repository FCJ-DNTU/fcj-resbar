import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = () => {
  const auth = isAuthenticated(); // Check if the user is authenticated
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
