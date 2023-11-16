import React from "react";
import AuthBuyer from "../../utils/authBuyer";
import Layout from "../../components/Layouts";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateBuyer() {
  if (!AuthBuyer.isAuthorization()) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
