import React from "react";
import dataCurrentUser from "../../../global/dataCurrentUser";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BoxProfile() {
  const currentUser = dataCurrentUser();
  const { data: user } = currentUser;

  return (
    <div className="d-flex justify-content-between align-items-center bg-body border rounded-4 p-3 mb-4">
      <div className="d-flex align-items-center">
        <img
          src={user?.photo_url}
          alt="user"
          width="48px"
          height="48px"
          className="me-3 rounded"
          style={{ objectFit: "cover" }}
        />
        <div>
          <p className="m-0">{user?.name}</p>
          <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
            {user?.city}
          </p>
        </div>
      </div>

      <div>
        <Button variant="outline-primary" as={Link} to="/info-profile">
          Edit
        </Button>
      </div>
    </div>
  );
}
