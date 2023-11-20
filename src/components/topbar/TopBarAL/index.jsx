import React from "react";
import List from "../../../assets/icon/list.svg";
import NavProfile from "./NavProfile";
import NavNotification from "./NavNotification";
import { Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopBarAL() {
  return (
    <>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cari di sini ..."
            className="border-0 rounded-4"
            style={{
              backgroundColor: "#EEEEEE",
              fontSize: "14px",
              width: "300px",
            }}
          />
        </Form>

        <Nav
          className="ms-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link as={Link} to="/daftar-jual">
            <img src={List} alt="list" />
          </Nav.Link>
          <NavNotification />
          <NavProfile />
        </Nav>
      </Navbar.Collapse>
    </>
  );
}
