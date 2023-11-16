import React from "react";
import AuthSeller from "../../utils/authSeller";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedSeller() {
  if (AuthSeller.getAccessToken()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
