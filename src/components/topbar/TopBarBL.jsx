import React from "react";
import Login from "../../assets/icon/login.svg";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopBarBL() {
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
          <Button as={Link} to="/login">
            <img src={Login} alt="login" className="me-2" />
            Masuk
          </Button>
        </Nav>
      </Navbar.Collapse>
    </>
  );
}
