import React from "react";
import Auth from "../../utils/auth";
import Layout from "../../components/Layouts";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateUser() {
  if (!Auth.isAuthorization()) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
