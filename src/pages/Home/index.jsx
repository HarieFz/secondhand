/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import dataCurrentUser from "../../global/dataCurrentUser";
import Banner from "../../assets/img/banner.png";
import BannerLeft from "../../assets/img/banner-left.png";
import BannerRight from "../../assets/img/banner-right.png";
import SearchWhite from "../../assets/icon/search-white.svg";
import SearchBlack from "../../assets/icon/search-black.svg";
import Toast from "../../components/confirmToast";
import useFetchAllData from "../../hooks/query/useFetchAllData";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [radioValue, setRadioValue] = useState("Semua");

  const _categories = useFetchAllData("categories");
  const { data: categories, isLoading: loadingCategories } = _categories;

  const _items = useFetchAllData("items");
  const { data: items, isLoading: loadingItems } = _items;

  const _user = dataCurrentUser();
  const { data: user } = _user;

  const handleSell = () => {
    const _data = new Array(user);
    const isHaveNotCompleteProfile = _data.every(
      (item) =>
        item.photo_url === "" ||
        item.name === "" ||
        item.city === "" ||
        item.address === "" ||
        item.phone_number === "" ||
        item.email === ""
    );

    if (isHaveNotCompleteProfile === false) return navigate("/info-produk");
    if (isHaveNotCompleteProfile === true) {
      navigate("/info-profile");
      Toast.fire({
        text: "Silahkan lengkapi info akun terlebih dahulu",
        background: "#FA2C5A",
      });
    }
  };

  return (
    <>
      <div className="mb-5" style={{ width: "100%" }}>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div>
            <img src={BannerLeft} alt="Banner" className="img-fluid" />
          </div>
          <div>
            <img src={Banner} alt="Banner" className="img-fluid" />
          </div>
          <div>
            <img src={BannerRight} alt="Banner" className="img-fluid" />
          </div>
        </div>
      </div>

      <Container>
        <div className="mb-5">
          <h5 className="mb-3">Telusuri Kategori</h5>
          <div className="d-flex gap-3 mb-4">
            <ToggleButton
              id={`radio-all`}
              type="radio"
              variant={radioValue === "Semua" ? "primary" : "secondary"}
              name="radio"
              value="Semua"
              checked={radioValue === "Semua"}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radioValue === "Semua" ? (
                <img src={SearchWhite} alt="search" className="me-2" />
              ) : (
                <img src={SearchBlack} alt="search" className="me-2" />
              )}
              Semua
            </ToggleButton>
            {loadingCategories && <p>Loading ...</p>}
            {categories.map((item, index) => (
              <ToggleButton
                key={index}
                id={`radio-${index}`}
                type="radio"
                variant={radioValue === item.category ? "primary" : "secondary"}
                name="radio"
                value={item.category}
                checked={radioValue === item.category}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radioValue === item.category ? (
                  <img src={SearchWhite} alt="search" className="me-2" />
                ) : (
                  <img src={SearchBlack} alt="search" className="me-2" />
                )}
                {item.category}
              </ToggleButton>
            ))}
          </div>

          <div>
            <Row className="gy-4">
              {loadingItems && <p>Loading ...</p>}
              {items.map((item, idx) => (
                <Col lg={2} md={3} sm={4} xs={6} key={idx}>
                  <Card
                    className="p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/halaman-produk/${item.id}`)}
                  >
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.img_url[0]}
                        className="rounded"
                        alt="Foto Barang"
                        style={{
                          height: "100px",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {item?.sold && (
                        <>
                          <div className="transparency rounded rounded-circle"></div>
                          <p className="text-in-transparency">Terjual</p>
                        </>
                      )}
                    </div>

                    <Card.Body className="px-0">
                      <p className="mb-1 fw-bold text-card-overflow">
                        {item.name}
                      </p>
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
          </div>

          <div style={{ position: "fixed", bottom: "30px", right: "45%" }}>
            <Button
              className="shadow"
              style={{ width: "115px" }}
              onClick={handleSell}
            >
              + Jual
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
