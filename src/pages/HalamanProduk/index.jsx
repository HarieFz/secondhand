import React from "react";
import User from "../../assets/img/user.png";
import { Carousel, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ModalNego from "./components/ModalNego";

export default function HalamanProduk() {
  const { state } = useLocation();

  return (
    <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
      <Row>
        <Col lg={8}>
          <Carousel>
            <Carousel.Item>
              <img src={state.img} alt="" width="100%" />
            </Carousel.Item>
          </Carousel>

          <div className="bg-body border rounded-4 p-3 mt-4">
            <h5>Deskripsi</h5>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              eos itaque eum? Provident debitis quis omnis facilis architecto,
              voluptate aliquid ratione eum voluptatibus minus est commodi vel
              voluptas quas cumque? Corporis non molestiae aliquid quidem, dolor
              laudantium, adipisci eligendi suscipit vero incidunt libero
              reiciendis perspiciatis tempora quo possimus. Blanditiis dolor
              illum in, reprehenderit cumque ipsa maxime inventore quasi totam
              saepe! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dolore voluptatibus eveniet doloremque a molestias tempora
              perferendis blanditiis nulla ipsum. Nulla similique nihil animi
              reprehenderit perferendis deleniti, consequatur porro unde
              molestiae!
            </p>
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
            <img src={User} alt="user" className="me-3 rounded" />
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
