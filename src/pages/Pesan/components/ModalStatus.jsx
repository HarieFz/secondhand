import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalStatus() {
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div>
        <Button
          variant="outline-primary"
          style={{ width: "158px" }}
          onClick={handleShow}
        >
          Status
        </Button>

        <Modal
          dialogClassName="w-25"
          show={modalShow}
          onHide={handleClose}
          centered
        >
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Body className="py-0 pb-4 px-4">
            <p className="fw-bold">Perbarui status penjualan produkmu</p>

            <div className="mb-4">
              <Form.Check
                type="radio"
                name="status"
                label={
                  <div className="ms-2">
                    <p className="mb-2">Berhasil terjual</p>
                    <p className="m-0 text-black-50">
                      Kamu telah sepakat menjual produk ini kepada pembeli
                    </p>
                  </div>
                }
                className="mb-3"
              />
              <Form.Check
                type="radio"
                name="status"
                label={
                  <div className="ms-2">
                    <p className="mb-2">Batalkan transaksi</p>
                    <p className="m-0 text-black-50">
                      Kamu membatalkan transaksi produk ini dengan pembeli
                    </p>
                  </div>
                }
              />
            </div>

            <Button onClick={handleSubmit} className="w-100">
              Kirim
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
