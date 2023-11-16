import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import PrivateBuyer from "./buyer/PrivateBuyer";
import PrivateSeller from "./seller/PrivateSeller";
import ProtectedBuyer from "./buyer/ProtectedBuyer";
import ProtectedSeller from "./seller/ProtectedSeller";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../components/Layouts";

export default function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/buyer" element={<ProtectedBuyer />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/buyer" element={<PrivateBuyer />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/seller" element={<ProtectedSeller />}>
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="/seller" element={<PrivateSeller />}>
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
