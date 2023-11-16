import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import Login from "../../assets/icon/login.svg";
import { Link } from "react-router-dom";

export default function TopBarBL() {
  return (
    <>
      <Navbar expand="lg" data-bs-theme="light" className="shadow-sm mb-4">
        <Container>
          <Navbar.Brand href="/">SecondHand</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Cari di sini ..."
                className="border-0 me-2 w-100"
                style={{
                  backgroundColor: "#EEEEEE",
                  fontSize: "14px",
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
        </Container>
      </Navbar>
    </>
  );
}
