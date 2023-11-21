import React from "react";
import { Card } from "react-bootstrap";

export default function CardItem({ item, handleClick }) {
  return (
    <Card
      className="p-2"
      style={{
        cursor: "pointer",
        width: "210px",
        height: "200px",
      }}
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={item.img_url}
        className="img-fluid rounded"
        style={{ height: "100px", objectFit: "cover" }}
      />
      <Card.Body className="px-0 py-1">
        <p className="mb-1 fw-bold">{item.name}</p>
        <p className="mb-2 fw-light text-black-50" style={{ fontSize: "12px" }}>
          {item.category}
        </p>
        <p className="mb-0 fw-bold">{item.price}</p>
      </Card.Body>
    </Card>
  );
}
