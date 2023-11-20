import React from "react";
import Auth from "../utils/auth";
import User from "../assets/icon/user.svg";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { signOut } from "firebase/auth";

export default function NavProfile() {
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
    <NavDropdown
      title={
        <>
          <img src={User} alt="Bell" />
        </>
      }
      align="end"
    >
      <NavDropdown.Item as={Link} to="/info-profile">
        Pengaturan akun
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}>Keluar</NavDropdown.Item>
    </NavDropdown>
  );
}
