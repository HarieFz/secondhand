import React from "react";
import { Nav } from "react-bootstrap";

export default function TopBarProfile() {
  return (
    <Nav
      className="mx-auto my-2 my-lg-0"
      style={{ maxHeight: "100px" }}
      navbarScroll
    >
      <p className="m-0">Lengkapi info akun</p>
    </Nav>
  );
}
