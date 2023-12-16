import React from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import ModalNego from "./components/ModalNego";
import { useParams } from "react-router-dom";
import useFetchDataById from "../../hooks/query/useFetchDataById";
import dataCurrentUser from "../../global/dataCurrentUser";
import ModalMarkAsSold from "./components/ModalMarkAsSold";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function HalamanProduk() {
  const { id } = useParams();
  const _item = useFetchDataById("items", id);
  const { data: item } = _item;

  const userCurrent = dataCurrentUser();
  const { data: user } = userCurrent;

  const markAsAvailable = () => {
    updateDoc(doc(db, "items", item?.id), {
      sold: false,
      mark_as_sold: "",
    });
  };

  return (
    <Container>
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <Row>
          <Col lg={8}>
            <Carousel style={{ width: "600px", height: "436px" }}>
              {item?.img_url?.map((item, index) => (
                <Carousel.Item
                  key={index}
                  style={{ width: "600px", height: "436px" }}
                >
                  <img
                    src={item}
                    alt={`Foto ke-${index + 1}`}
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
              <p>{item?.description}</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className="bg-body border border-2 rounded-4 p-3 mb-3">
              <p className="mb-1 fw-bold">{item?.name}</p>
              <p className="mb-2 text-black-50" style={{ fontSize: "12px" }}>
                {item?.category}
              </p>
              <div className="d-flex mb-3">
                <p className="mb-0 fw-bold">{item?.price}</p>
                {item?.sold && <p className="mb-0">&nbsp;-&nbsp;</p>}
                {item?.sold && <p className="mb-0 text-danger">Terjual</p>}
              </div>

              {item?.seller?.id === user?.id ? (
                item?.sold ? (
                  <Button className="w-100" onClick={markAsAvailable}>
                    Tandai masih tersedia
                  </Button>
                ) : (
                  <ModalMarkAsSold item={item} />
                )
              ) : item?.sold ? (
                <></>
              ) : (
                <ModalNego item={item} />
              )}
            </div>

            <div className="d-flex align-items-center bg-body border rounded-4 p-3">
              <img
                src={item?.seller?.photo_url}
                alt="user"
                width="48px"
                height="48px"
                className="me-3 rounded"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0">{item?.seller?.name}</p>
                <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                  {item?.seller?.city}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
