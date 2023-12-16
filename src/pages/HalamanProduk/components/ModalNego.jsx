import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ModalNego({ item }) {
  const [price, setPrice] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const onPrice = (e) => setPrice(e.target.value);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showCloseButton: true,
    showConfirmButton: false,
    color: "#FFFFFF",
    background: "#73CA5C",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalShow(false);
    Toast.fire({
      text: "Harga tawarmu berhasil dikirim ke penjual",
    });
    setPrice("");
  };

  return (
    <div>
      <Button className="w-100" onClick={handleShow}>
        Saya tertarik dan ingin nego
      </Button>

      <Modal
        dialogClassName="w-25"
        show={modalShow}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="py-0 pb-4 px-4">
          <p className="fw-bold">Masukkan Harga Tawarmu</p>
          <p className="text-black-50">
            Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </p>

          <div
            className="d-flex rounded-4 p-3 mb-3"
            style={{ background: "#EEEEEE" }}
          >
            <img
              src={item?.img_url && item?.img_url[0]}
              alt="items"
              width="48px"
              height="48px"
              className="me-3 rounded-3"
              style={{ objectFit: "cover" }}
            />
            <div>
              <p className="m-0 fw-bold">{item?.name}</p>
              <p className="m-0">{item?.price}</p>
            </div>
          </div>

          <Form.Group className="mb-3">
            <p className="mb-1">Harga Tawar</p>
            <Form.Control
              type="text"
              placeholder="Rp 0,00"
              value={price}
              onChange={onPrice}
              className="shadow"
            />
          </Form.Group>

          <Button onClick={handleSubmit} className="w-100" disabled={!price}>
            Kirim
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
