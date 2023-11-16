import React from "react";
import Auth from "../../utils/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedUser() {
  if (Auth.getAccessToken()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
