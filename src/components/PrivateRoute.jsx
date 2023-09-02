import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { user, token } = useSelector((state) => state.auth);

  return user && token ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}

export default PrivateRoute;
