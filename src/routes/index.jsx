import React from "react";
import DaftarJual from "../pages/DaftarJual";
import HalamanProduk from "../pages/HalamanProduk";
import Home from "../pages/Home";
import InfoProduk from "../pages/InfoProduk";
import InfoProfile from "../pages/InfoProfile";
import Login from "../pages/Login";
import Layout from "../components/Layouts";
import Pesan from "../pages/Pesan";
import PreviewProduk from "../pages/PreviewProduk";
import PrivateUser from "./user/PrivateUser";
import ProtectedUser from "./user/ProtectedUser";
import Register from "../pages/Register";
import SemuaPesan from "../pages/SemuaPesan";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditInfoProduk from "../pages/EditInfoProduk";

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
          <Route path="edit-info-produk" element={<EditInfoProduk />} />
          <Route path="preview-produk" element={<PreviewProduk />} />
          <Route path="daftar-jual" element={<DaftarJual />} />
          <Route path="semua-pesan" element={<SemuaPesan />} />
          <Route path="pesan" element={<Pesan />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
