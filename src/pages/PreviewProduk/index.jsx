import React, { useContext } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { ProdukContext } from "../../context/ProdukProvider";

export default function PreviewProduk() {
  const {
    name,
    price,
    category,
    description,
    img,
    seller,
    isLoading,
    handleSubmit,
    navigate,
  } = useContext(ProdukContext);

  return (
    <Container>
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <Row>
          <Col lg={8}>
            <Carousel style={{ width: "600px", height: "436px" }}>
              {img?.map((photo, index) => (
                <Carousel.Item
                  key={index}
                  style={{ width: "600px", height: "436px" }}
                >
                  <img
                    src={photo.file && URL.createObjectURL(photo.file)}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="bg-body border rounded-4 p-3 mt-4">
              <h5>Deskripsi</h5>
              <p>{description}</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className="bg-body border border-2 rounded-4 p-3 mb-3">
              <p className="mb-1 fw-bold">{name}</p>
              <p className="text-black-50" style={{ fontSize: "12px" }}>
                {category}
              </p>
              <p className="m-0 fw-bold mb-3">{price}</p>

              <div className="mb-2">
                <Button
                  className="d-block w-100"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading ..." : "Terbitkan"}
                </Button>
              </div>

              <div>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => navigate("/info-produk")}
                  disabled={isLoading}
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="d-flex bg-body border rounded-4 p-3">
              <img
                src={seller.photo_url}
                alt="user"
                className="me-3 rounded"
                width="48px"
                height="48px"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0">{seller.name}</p>
                <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                  {seller.city}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
