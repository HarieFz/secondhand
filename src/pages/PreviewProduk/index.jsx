import React, { useContext, useState } from "react";
import Toast from "../../components/confirmToast";
import { addDoc, collection } from "firebase/firestore";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { db } from "../../config/firebase";
import { ProdukContext } from "../../context/ProdukProvider";

export default function PreviewProduk() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    name,
    price,
    category,
    description,
    img,
    seller,
    handlePhoto,
    navigate,
  } = useContext(ProdukContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imgURL = await handlePhoto();
    addDoc(collection(db, "items"), {
      name: name,
      price: price,
      category: category,
      description: description,
      img_url: imgURL,
      interested: false,
      sold: false,
      seller: seller,
    })
      .then(() => {
        navigate("/daftar-jual");
        setIsLoading(false);
        Toast.fire({
          text: "Produk berhasil diterbitkan",
          background: "#73CA5C",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        Toast.fire({
          text: "Terjadi suatu kesalahan, silahkan coba lagi",
          background: "#FA2C5A",
        });
      });
  };

  return (
    <Container>
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <Row>
          <Col lg={8}>
            <Carousel className="rounded-4 border">
              {img?.map((photo, index) => (
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
