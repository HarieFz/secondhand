import React from "react";
import HalamanProduk from "../pages/HalamanProduk";
import Home from "../pages/Home";
import InfoProfile from "../pages/InfoProfile";
import Login from "../pages/Login";
import Layout from "../components/Layouts";
import PrivateUser from "./user/PrivateUser";
import ProtectedUser from "./user/ProtectedUser";
import Register from "../pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfoProduk from "../pages/InfoProduk";

export default function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedUser />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/" element={<PrivateUser />}>
          <Route path="halaman-produk" element={<HalamanProduk />} />
          <Route path="info-profile" element={<InfoProfile />} />
          <Route path="info-produk" element={<InfoProduk />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
