import React from "react";
import Auth from "../../utils/auth";
import TopBarAL from "../topbar/TopBarAL";
import TopBarBL from "../topbar/TopBarBL";
import TopBarProfile from "../topbar/TopBarProfile";
import TopBarNotification from "../topbar/TopBarNotification";
import { Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();

  return (
    <Navbar expand="lg" data-bs-theme="light" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SecondHand
        </Navbar.Brand>
        {location.pathname === "/info-profile" && <TopBarProfile />}

        {location.pathname === "/info-produk" && <></>}

        {location.pathname === "/pesan" && <TopBarNotification />}

        {location.pathname !== "/info-profile" &&
          location.pathname !== "/info-produk" &&
          location.pathname !== "/pesan" &&
          Auth.isAuthorization() && <TopBarAL />}

        {location.pathname !== "/info-profile" &&
          location.pathname !== "/info-produk" &&
          location.pathname !== "/pesan" &&
          !Auth.isAuthorization() && <TopBarBL />}
      </Container>
      <hr />
    </Navbar>
  );
}
