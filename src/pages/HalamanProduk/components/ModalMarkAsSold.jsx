import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../../config/firebase";

export default function ModalMarkAsSold({ item }) {
  const [markAsSold, setMarkAsSold] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const onMarkAsSold = (e) => setMarkAsSold(e.target.value);

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalShow(false);
    updateDoc(doc(db, "items", item?.id), {
      sold: true,
      mark_as_sold: markAsSold,
    });
    setMarkAsSold("");
  };

  return (
    <div>
      <Button className="w-100" onClick={handleShow}>
        Tandai telah terjual
      </Button>

      <Modal
        dialogClassName="w-25"
        show={modalShow}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="py-0 pb-4 px-4">
          <p className="fw-bold">Apakah barang telah terjual?</p>
          <p className="text-black-50">
            Jawaban Anda tidak akan dibagikan kepada siapa pun di SecondHand.
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

          <Form>
            <Form.Check
              label="Ya, terjual di SecondHand"
              type="radio"
              name="group1"
              id="1"
              value="Ya, terjual di SecondHand"
              onChange={onMarkAsSold}
            />
            <hr className="my-2" />
            <Form.Check
              label="Ya, terjual di tempat lain"
              type="radio"
              name="group1"
              id="2"
              value="Ya, terjual di tempat lain"
              onChange={onMarkAsSold}
            />
            <hr className="my-2" />
            <Form.Check
              label="Tidak, belum terjual"
              type="radio"
              name="group1"
              id="3"
              value="Tidak, belum terjual"
              onChange={onMarkAsSold}
            />
            <hr className="my-2" />
            <Form.Check
              label="Saya tidak ingin menjawab"
              type="radio"
              name="group1"
              id="4"
              value="Saya tidak ingin menjawab"
              onChange={onMarkAsSold}
            />
            <hr className="mt-2 mb-4" />
          </Form>

          <Button
            onClick={handleSubmit}
            className="w-100"
            disabled={!markAsSold}
          >
            Lanjutkan
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
