import React from "react";
import AuthSeller from "../../utils/authSeller";
import Layout from "../../components/Layouts";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateSeller() {
  if (!AuthSeller.isAuthorization()) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
