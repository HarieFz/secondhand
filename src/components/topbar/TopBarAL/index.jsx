import React from "react";
import List from "../../../assets/icon/list.svg";
import NavProfile from "./NavProfile";
import NavNotification from "./NavNotification";
import Search from "../../../assets/icon/search-gray.svg";
import { Form, InputGroup, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopBarAL() {
  return (
    <>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <InputGroup style={{ width: "300px" }}>
          <Form.Control
            type="text"
            placeholder="Cari di sini ..."
            className="form-search"
            style={{
              backgroundColor: "#EEEEEE",
              fontSize: "14px",
            }}
          />
          <InputGroup.Text
            className="label-search"
            style={{ backgroundColor: "#EEEEEE" }}
          >
            <img src={Search} alt="Search" />
          </InputGroup.Text>
        </InputGroup>

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
