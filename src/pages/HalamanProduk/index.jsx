import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ModalNego from "./components/ModalNego";

export default function HalamanProduk() {
  const { state } = useLocation();

  return (
    <Container>
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <Row>
          <Col lg={8}>
            <Carousel>
              {state.img_url.map((item, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={item}
                    alt=""
                    width="100%"
                    height="436px"
                    className="rounded-4"
                    style={{ objectFit: "cover" }}
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
              <p className="mb-2 text-black-50" style={{ fontSize: "12px" }}>
                {state.category}
              </p>
              <p className="mb-0 fw-bold mb-3">{state.price}</p>
              <ModalNego state={state} />
            </div>

            <div className="d-flex align-items-center bg-body border rounded-4 p-3">
              <img
                src={state.seller.photo_url}
                alt="user"
                width="48px"
                height="48px"
                className="me-3 rounded"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0">{state.seller.name}</p>
                <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                  {state.seller.city}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
