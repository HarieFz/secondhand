import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../components/Layouts";
import PrivateUser from "./user/PrivateUser";
import ProtectedUser from "./user/ProtectedUser";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buyer" element={<ProtectedUser />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/buyer" element={<PrivateUser />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
