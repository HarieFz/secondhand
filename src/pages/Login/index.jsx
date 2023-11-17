import React, { useState } from "react";
import Banner from "../../assets/img/login.png";
import useSignIn from "../../hooks/authentication/useSignIn";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmail = (e) => setEmail(e.target.value);
  const onPassword = (e) => setPassword(e.target.value);

  const signIn = useSignIn(email, password);
  const { isLoading } = signIn;

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn.mutate(true);
  };

  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col
        style={{ width: "100vw", height: "100vh" }}
        className="d-none d-md-block"
      >
        <img
          src={Banner}
          alt="Banner Login"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Col>
      <Col>
        <Form style={{ padding: "0px 100px" }} onSubmit={handleSignIn}>
          <h3 className="fw-bolder text-black mb-4">Masuk</h3>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Contoh: johndee@gmail.com"
              className="rounded-3"
              onChange={onEmail}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan password"
              onChange={onPassword}
            />
          </Form.Group>

          <Button className="w-100" type="submit" disabled={isLoading}>
            {isLoading ? "Loading ..." : "Masuk"}
          </Button>

          <p className="text-center mt-5">
            Sudah punya akun?{" "}
            <Link
              style={{ color: "#7126B5" }}
              className="text-decoration-none fw-bold"
              to="/register"
            >
              Masuk di sini
            </Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
