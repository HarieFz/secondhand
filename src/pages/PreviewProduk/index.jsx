import React, { useState } from "react";
import User from "../../assets/img/user.png";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PreviewProduk() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showCloseButton: true,
    showConfirmButton: false,
    color: "#FFFFFF",
    background: "#73CA5C",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    navigate("/daftar-jual");
    Toast.fire({
      text: "Produk berhasil diterbitkan",
    });
    setIsLoading(false);
  };

  return (
    <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
      <Row>
        <Col lg={8}>
          <Carousel className="rounded-4 border">
            {state?.photos?.map((photo, index) => (
              <Carousel.Item key={index}>
                <img
                  src={photo.file && URL.createObjectURL(photo.file)}
                  alt=""
                  width="600px"
                  height="436px"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="bg-body border rounded-4 p-3 mt-4">
            <h5>Deskripsi</h5>
            <p>{state.description}</p>
          </div>
        </Col>
        <Col lg={4}>
          <div className="bg-body border border-2 rounded-4 p-3 mb-3">
            <p className="mb-1 fw-bold">{state.name}</p>
            <p className="text-black-50" style={{ fontSize: "12px" }}>
              {state.category}
            </p>
            <p className="m-0 fw-bold mb-3">{state.price}</p>

            <div className="mb-2">
              <Button className="d-block w-100" onClick={handleSubmit}>
                {isLoading ? "Loading ..." : "Terbitkan"}
              </Button>
            </div>

            <div>
              <Button
                as={Link}
                to="/info-produk"
                variant="outline-primary"
                className="w-100"
              >
                Edit
              </Button>
            </div>
          </div>

          <div className="d-flex bg-body border rounded-4 p-3">
            <img src={User} alt="user" className="me-3" />
            <div>
              <p className="m-0">Nama Penjual</p>
              <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                Kota
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
