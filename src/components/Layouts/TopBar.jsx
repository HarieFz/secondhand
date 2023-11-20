import React, { useState } from "react";
import Auth from "../../utils/auth";
import Bell from "../../assets/icon/bell.svg";
import List from "../../assets/icon/list.svg";
import Login from "../../assets/icon/login.svg";
import Notification from "../Notification";
import User from "../../assets/icon/user.svg";
import { auth } from "../../config/firebase";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function TopBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

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
            {Auth.isAuthorization() ? (
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/daftar-jual">
                  <img src={List} alt="list" />
                </Nav.Link>
                <Nav.Link className="me-4">
                  <div style={{ position: "absolute" }}>
                    <img
                      src={Bell}
                      alt="bell"
                      onMouseEnter={() => setShow(true)}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                    {show && (
                      <div
                        style={{
                          zIndex: "1",
                          position: "relative",
                          top: "5px",
                          right: "360px",
                        }}
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                      >
                        <Notification />
                      </div>
                    )}
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/info-profile">
                  <img src={User} alt="user" />
                </Nav.Link>
                <Button variant="danger" onClick={logout}>
                  Keluar
                </Button>
              </Nav>
            ) : (
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
            )}
          </Navbar.Collapse>
        </Container>
        <hr />
      </Navbar>
    </>
  );
}
