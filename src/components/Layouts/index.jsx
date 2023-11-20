import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <div>
      <TopBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
