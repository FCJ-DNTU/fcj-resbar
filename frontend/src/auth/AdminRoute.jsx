import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./index"; // Assuming `isAdmin` exists

const AdminRoute = () => {
  const auth = isAuthenticated();

  return auth && auth.isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default AdminRoute;
