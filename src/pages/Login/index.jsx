import React, { useState } from "react";
import Banner from "../../assets/img/login.png";
import EyeGray from "../../assets/icon/eye-gray.svg";
import EyePurple from "../../assets/icon/eye-purple.svg";
import useSignIn from "../../hooks/authentication/useSignIn";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onEmail = (e) => setEmail(e.target.value);
  const onPassword = (e) => setPassword(e.target.value);

  const signIn = useSignIn(email, password);
  const { isLoading } = signIn;

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn.mutate(true);
  };

  return (
    <Row
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%" }}
    >
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

          <Form.Label>Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type={show ? "text" : "password"}
              placeholder="Masukkan password"
              className="form-password"
              onChange={onPassword}
            />
            <InputGroup.Text
              className="label-password"
              style={{
                cursor: "pointer",
                backgroundColor: "#FFFFFF",
              }}
              onClick={() => setShow((prev) => !prev)}
            >
              <img src={show ? EyePurple : EyeGray} alt="Show" />
            </InputGroup.Text>
          </InputGroup>

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
