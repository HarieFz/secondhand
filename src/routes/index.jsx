import React from "react";
import HalamanProduk from "../pages/HalamanProduk";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../components/Layouts";
import PrivateUser from "./user/PrivateUser";
import ProtectedUser from "./user/ProtectedUser";
import Register from "../pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedUser />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateUser />}>
          {/* <Route index element={<Home />} /> */}
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="halaman-produk" element={<HalamanProduk />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
