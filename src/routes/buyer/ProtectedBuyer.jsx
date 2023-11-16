import React from "react";
import AuthBuyer from "../../utils/authBuyer";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedBuyer() {
  if (AuthBuyer.getAccessToken()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
