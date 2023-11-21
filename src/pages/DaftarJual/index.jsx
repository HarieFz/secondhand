import React, { Fragment, useState } from "react";
import AddProduct from "../../assets/img/add-product.png";
import BoxProfile from "./components/BoxProfile";
import CardItem from "./components/CardItem";
import Illustration from "../../assets/img/illustration-selling-list.png";
import Sidebar from "./components/Sidebar";
import useFetchAllData from "../../hooks/query/useFetchAllData";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DaftarJual() {
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState(true);
  const [interested, setInterested] = useState(false);
  const [sold, setSold] = useState(false);

  const _items = useFetchAllData("items");
  const { data: items, isLoading } = _items;

  const validateInterested = (value) =>
    value.every((item) => item.interested === false);

  const validateSold = (value) => value.every((item) => item.sold === false);

  return (
    <Container>
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <h4 className="mb-4">Daftar Jual Saya</h4>
        <BoxProfile />

        <Row className="gy-4">
          <Col lg={3}>
            <Sidebar
              allProduct={allProduct}
              setAllProduct={setAllProduct}
              interested={interested}
              setInterested={setInterested}
              sold={sold}
              setSold={setSold}
            />
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

                {isLoading && (
                  <Col lg={4} md={6}>
                    <p>Loading ...</p>
                  </Col>
                )}

                {items?.map((item, index) => (
                  <Col lg={4} md={6} key={index}>
                    <CardItem
                      item={item}
                      handleClick={() =>
                        navigate("/info-produk", {
                          state: item,
                        })
                      }
                    />
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
                    {isLoading && (
                      <Col lg={4} md={6}>
                        <p>Loading ...</p>
                      </Col>
                    )}

                    {item.interested && (
                      <Col lg={4} md={6} key={index}>
                        <CardItem item={item} />
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
                    {isLoading && (
                      <Col lg={4} md={6}>
                        <p>Loading ...</p>
                      </Col>
                    )}

                    {item.sold && (
                      <Col lg={4} md={6} key={index}>
                        <CardItem item={item} />
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
