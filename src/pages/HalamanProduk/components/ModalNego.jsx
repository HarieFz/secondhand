import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalNego({ state }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className="w-100" onClick={handleShow}>
        Saya tertarik dan ingin nego
      </Button>

      <Modal dialogClassName="w-25" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="py-0 pb-4 px-4">
          <p className="fw-bold">Masukkan Harga Tawarmu</p>
          <p className="text-black-50">
            Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan
            segera dihubungi penjual.
          </p>

          <div
            className="d-flex rounded-4 p-3 mb-3"
            style={{ background: "#EEEEEE" }}
          >
            <img
              src={state.img}
              alt="items"
              width="48px"
              height="48px"
              className="me-3 rounded-3"
              style={{ objectFit: "cover" }}
            />
            <div>
              <p className="m-0 fw-bold">{state.name}</p>
              <p className="m-0">{state.price}</p>
            </div>
          </div>

          <Form.Group className="mb-3">
            <p className="m-0">Harga Tawar</p>
            <Form.Control
              type="text"
              placeholder="Rp 0,00"
              className="shadow"
            />
          </Form.Group>

          <Button className="w-100">Kirim</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
