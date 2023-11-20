import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Whatsapp from "../../../assets/icon/whatsapp.svg";

export default function ModalTerimaTawaran({ buyer, item, setAccept }) {
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => {
    setModalShow(false);
    setAccept(true);
  };
  const handleShow = () => setModalShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Button style={{ width: "158px" }} onClick={handleShow}>
        Terima
      </Button>

      <Modal
        dialogClassName="w-25"
        show={modalShow}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="py-0 pb-4 px-4">
          <p className="fw-bold">
            Yeay kamu berhasil mendapat harga yang sesuai
          </p>
          <p className="text-black-50">
            Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya
          </p>

          <div className="rounded-4 p-3 mb-3" style={{ background: "#EEEEEE" }}>
            <p className="text-center fw-bold">Product Match</p>

            <div className="d-flex mb-3">
              <img
                src={buyer.img}
                alt="buyer"
                width="48px"
                height="48px"
                className="me-3 rounded-3"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0">{buyer.name}</p>
                <p className="m-0">{buyer.kota}</p>
              </div>
            </div>

            <div className="d-flex">
              <img
                src={item.img}
                alt="items"
                width="48px"
                height="48px"
                className="me-3 rounded-3"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0">{item.name}</p>
                <p className="m-0 text-decoration-line-through">{item.price}</p>
                <p className="m-0">Ditawar {item.bargain_price}</p>
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-100">
            Hubungi via Whatsapp <img src={Whatsapp} alt="whatsapp" />
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
