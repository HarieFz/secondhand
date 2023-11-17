import React from "react";
import Auth from "../../utils/auth";
import Bell from "../../assets/icon/bell.svg";
import List from "../../assets/icon/list.svg";
import User from "../../assets/icon/user.svg";
import { auth } from "../../config/firebase";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function TopBarAL() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      Auth.signOut(navigate);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Navbar expand="lg" data-bs-theme="light" className="shadow-sm mb-4">
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
              <Button variant="danger" onClick={logout}>
                Keluar
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <hr />
      </Navbar>
    </>
  );
}
