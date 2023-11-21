import React, { Fragment, useState } from "react";
import AddProduct from "../../assets/img/add-product.png";
import BoxGray from "../../assets/icon/box-gray.svg";
import BoxPurple from "../../assets/icon/box-purple.svg";
import ChevronRightGray from "../../assets/icon/chevron-right-gray.svg";
import ChevronRightPurple from "../../assets/icon/chevron-right-purple.svg";
import HeartGray from "../../assets/icon/heart-gray.svg";
import HeartPurple from "../../assets/icon/heart-purple.svg";
import Illustration from "../../assets/img/illustration-selling-list.png";
import DollarGray from "../../assets/icon/dollar-gray.svg";
import DollarPurple from "../../assets/icon/dollar-purple.svg";
import User from "../../assets/img/user.png";
import Watch from "../../assets/img/watch.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    interested: true,
    sold: false,
  },
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    interested: true,
    sold: false,
  },
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    interested: false,
    sold: false,
  },
];

export default function DaftarJual() {
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState(true);
  const [interested, setInterested] = useState(false);
  const [sold, setSold] = useState(false);

  const onAllProduct = () => {
    setAllProduct(true);
    setInterested(false);
    setSold(false);
  };

  const onInterested = () => {
    setAllProduct(false);
    setInterested(true);
    setSold(false);
  };

  const onSold = () => {
    setAllProduct(false);
    setInterested(false);
    setSold(true);
  };

  const validateInterested = (value) =>
    value.every((item) => item.interested === false);

  const validateSold = (value) => value.every((item) => item.sold === false);

  return (
    <Container>
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <h4 className="mb-4">Daftar Jual Saya</h4>
        <div className="d-flex justify-content-between align-items-center bg-body border rounded-4 p-3 mb-4">
          <div className="d-flex align-items-center">
            <img src={User} alt="user" className="me-3" />
            <div>
              <p className="m-0">Nama Penjual</p>
              <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                Kota
              </p>
            </div>
          </div>

          <div>
            <Button variant="outline-primary" as={Link} to="/info-profile">
              Edit
            </Button>
          </div>
        </div>

        <Row className="gy-4">
          <Col lg={3}>
            <div className="bg-body border rounded-4 p-4">
              <h5 className="mb-4">Kategori</h5>

              <div
                className="d-flex justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => onAllProduct()}
              >
                <div className="d-flex align-items-center gap-2">
                  <img src={allProduct ? BoxPurple : BoxGray} alt="Box" />
                  <p
                    className="m-0"
                    style={{ color: ` ${allProduct ? "#7126B5" : "#8A8A8A"}` }}
                  >
                    Semua Produk
                  </p>
                </div>
                <img
                  src={allProduct ? ChevronRightPurple : ChevronRightGray}
                  alt=">"
                />
              </div>
              <div
                style={{
                  height: "1px",
                  backgroundColor: `${allProduct ? "#7126B5" : "#8A8A8A"}`,
                  border: "none",
                  margin: "15px 0px",
                }}
              />

              <div
                className="d-flex justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => onInterested()}
              >
                <div className="d-flex align-items-center gap-2">
                  <img src={interested ? HeartPurple : HeartGray} alt="Box" />
                  <p
                    className="m-0"
                    style={{ color: `${interested ? "#7126B5" : "#8A8A8A"}` }}
                  >
                    Diminati
                  </p>
                </div>
                <img
                  src={interested ? ChevronRightPurple : ChevronRightGray}
                  alt=">"
                />
              </div>
              <div
                style={{
                  height: "1px",
                  backgroundColor: `${interested ? "#7126B5" : "#8A8A8A"}`,
                  border: "none",
                  margin: "15px 0px",
                }}
              />

              <div
                className="d-flex justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => onSold()}
              >
                <div className="d-flex align-items-center gap-2">
                  <img src={sold ? DollarPurple : DollarGray} alt="Box" />
                  <p
                    className="m-0"
                    style={{ color: `${sold ? "#7126B5" : "#8A8A8A"}` }}
                  >
                    Terjual
                  </p>
                </div>
                <img
                  src={sold ? ChevronRightPurple : ChevronRightGray}
                  alt=">"
                />
              </div>
            </div>
          </Col>

          {allProduct && (
            <Col lg={9}>
              <Row className="gy-4">
                <Col lg={4} md={6}>
                  <img
                    src={AddProduct}
                    alt="Tambah Produk"
                    width="210px"
                    height="200px"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/info-produk")}
                  />
                </Col>

                {items?.map((item, index) => (
                  <Col lg={4} md={6} key={index}>
                    <Card
                      className="p-2"
                      style={{
                        cursor: "pointer",
                        width: "210px",
                        height: "200px",
                      }}
                      onClick={() =>
                        navigate("/info-produk", {
                          state: item,
                        })
                      }
                    >
                      <Card.Img
                        variant="top"
                        src={item.img}
                        className="img-fluid rounded"
                        style={{ height: "100px", objectFit: "cover" }}
                      />
                      <Card.Body className="px-0 py-1">
                        <p className="mb-1 fw-bold">{item.name}</p>
                        <p
                          className="mb-2 fw-light text-black-50"
                          style={{ fontSize: "12px" }}
                        >
                          {item.category}
                        </p>
                        <p className="mb-0 fw-bold">{item.price}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          )}

          {interested && (
            <Col lg={9}>
              <Row className="gy-4">
                {items?.map((item, index) => (
                  <Fragment key={index}>
                    {item.interested && (
                      <Col lg={4} md={6} key={index}>
                        <Card
                          className="p-2"
                          style={{
                            cursor: "pointer",
                            width: "210px",
                            height: "200px",
                          }}
                          onClick={() =>
                            navigate("/info-produk", {
                              state: item,
                            })
                          }
                        >
                          <Card.Img
                            variant="top"
                            src={item.img}
                            className="img-fluid rounded"
                            style={{ height: "100px", objectFit: "cover" }}
                          />
                          <Card.Body className="px-0 py-1">
                            <p className="mb-1 fw-bold">{item.name}</p>
                            <p
                              className="mb-2 fw-light text-black-50"
                              style={{ fontSize: "12px" }}
                            >
                              {item.category}
                            </p>
                            <p className="mb-0 fw-bold">{item.price}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Fragment>
                ))}

                {validateInterested(items) && (
                  <Col lg={12} className="d-flex justify-content-center">
                    <img
                      src={Illustration}
                      alt="Belum ada produk yang diminati"
                    />
                  </Col>
                )}
              </Row>
            </Col>
          )}

          {sold && (
            <Col lg={9}>
              <Row className="gy-4">
                {items?.map((item, index) => (
                  <Fragment key={index}>
                    {item.sold && (
                      <Col lg={4} md={6} key={index}>
                        <Card
                          className="p-2"
                          style={{
                            cursor: "pointer",
                            width: "210px",
                            height: "200px",
                          }}
                          onClick={() =>
                            navigate("/info-produk", {
                              state: item,
                            })
                          }
                        >
                          <Card.Img
                            variant="top"
                            src={item.img}
                            className="img-fluid rounded"
                            style={{ height: "100px", objectFit: "cover" }}
                          />
                          <Card.Body className="px-0 py-1">
                            <p className="mb-1 fw-bold">{item.name}</p>
                            <p
                              className="mb-2 fw-light text-black-50"
                              style={{ fontSize: "12px" }}
                            >
                              {item.category}
                            </p>
                            <p className="mb-0 fw-bold">{item.price}</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}
                  </Fragment>
                ))}

                {validateSold(items) && (
                  <Col lg={12} className="d-flex justify-content-center">
                    <img
                      src={Illustration}
                      alt="Belum ada produk yang diminati"
                    />
                  </Col>
                )}
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
}
