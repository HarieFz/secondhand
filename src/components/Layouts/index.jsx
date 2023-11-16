import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Auth from "../../utils/auth";
import TopBarAL from "./TopBarAL";
import TopBarBL from "./TopBarBL";

export default function Layout() {
  if (Auth.getAccessToken()) {
    return (
      <div>
        <TopBarAL />
        <Container>
          <Outlet />
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <TopBarBL />
        <Container>
          <Outlet />
        </Container>
      </div>
    );
  }
}
