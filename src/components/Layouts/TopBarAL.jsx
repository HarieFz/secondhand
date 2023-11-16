import React from "react";
import Bell from "../../assets/icon/bell.svg";
import List from "../../assets/icon/list.svg";
import User from "../../assets/icon/user.svg";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopBarAL() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SecondHand
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
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
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#list">
              <img src={List} alt="list" />
            </Nav.Link>
            <Nav.Link href="#bell">
              <img src={Bell} alt="bell" />
            </Nav.Link>
            <Nav.Link href="#user">
              <img src={User} alt="user" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <hr />
    </Navbar>
  );
}
