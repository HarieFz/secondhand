import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Banner from "../../assets/img/login.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col style={{ width: "100vw", height: "100vh" }}>
        <img
          src={Banner}
          alt="Banner Login"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Col>
      <Col>
        <Form style={{ padding: "0px 100px" }}>
          <h3 className="fw-bolder text-black mb-4">Masuk</h3>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Contoh: johndee@gmail.com"
              className="rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="email" placeholder="Masukkan password" />
          </Form.Group>

          <Button className="w-100 mb-5">Masuk</Button>

          <p className="text-center">
            Belum punya akun?{" "}
            <Link
              style={{ color: "#7126B5" }}
              className="text-decoration-none fw-bold"
            >
              Daftar si sini
            </Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
