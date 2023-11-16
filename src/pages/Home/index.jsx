import React, { useState } from "react";
import Banner from "../../assets/img/banner.png";
import Watch from "../../assets/img/watch.png";
import SearchWhite from "../../assets/icon/search-white.svg";
import SearchBlack from "../../assets/icon/search-black.svg";
import { Button, Card, Col, Row, ToggleButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("Semua");

  const categories = [
    { name: "Semua", value: "Semua" },
    { name: "Hobi", value: "Hobi" },
    { name: "Kendaraan", value: "Kendaraan" },
    { name: "Baju", value: "Baju" },
    { name: "Elektronik", value: "Elektronik" },
    { name: "Kesehatan", value: "Kesehatan" },
  ];

  const items = [
    {
      img: Watch,
      name: "Jam Tangan Casio",
      category: "Aksesoris",
      price: "Rp 250.000",
    },
    {
      img: Watch,
      name: "Jam Tangan Casio",
      category: "Aksesoris",
      price: "Rp 250.000",
    },
    {
      img: Watch,
      name: "Jam Tangan Casio",
      category: "Aksesoris",
      price: "Rp 250.000",
    },
    {
      img: Watch,
      name: "Jam Tangan Casio",
      category: "Aksesoris",
      price: "Rp 250.000",
    },
    {
      img: Watch,
      name: "Jam Tangan Casio",
      category: "Aksesoris",
      price: "Rp 250.000",
    },
    {
      img: Watch,
      name: "Jam Tangan Casio",
      category: "Aksesoris",
      price: "Rp 250.000",
    },
  ];

  return (
    <>
      <div className="text-center mb-4">
        <img src={Banner} alt="Banner" />
      </div>

      <div className="mb-5">
        <h5>Telusuri Kategori</h5>
        <div className="d-flex gap-3 mb-4">
          {categories.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={radioValue === radio.value ? "primary" : "secondary"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radioValue === radio.value ? (
                <img src={SearchWhite} alt="search" className="me-2" />
              ) : (
                <img src={SearchBlack} alt="search" className="me-2" />
              )}
              {radio.name}
            </ToggleButton>
          ))}
        </div>

        <div>
          <Row className="gy-4">
            {items.map((item, idx) => (
              <Col lg={2} key={idx}>
                <Card
                  className="p-2"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate("/halaman-produk", {
                      state: item,
                    })
                  }
                >
                  <Card.Img
                    variant="top"
                    src={item.img}
                    className="img-fluid"
                  />
                  <Card.Body className="px-0">
                    <p className="m-0 fw-bold">{item.name}</p>
                    <p
                      className="m-0 fw-light text-black-50"
                      style={{ fontSize: "12px" }}
                    >
                      {item.category}
                    </p>
                    <p className="m-0 fw-bold">{item.price}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <div style={{ position: "fixed", bottom: "30px", right: "50%" }}>
          <Button className="shadow">+ Jual</Button>
        </div>
      </div>
    </>
  );
}
