import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import UploadPhoto from "../../assets/img/upload-photo.png";

export default function InfoProfile() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const [previewPhoto, setPreviewPhoto] = useState();
  const [name, setName] = useState("");
  const [kota, setKota] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHandphone, setNoHandphone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onPhoto = (e) => setPhoto(e.target.files[0]);
  const onName = (e) => setName(e.target.value);
  const onKota = (e) => setKota(e.target.value);
  const onAlamat = (e) => setAlamat(e.target.value);
  const onNoHandphone = (e) => setNoHandphone(e.target.value);

  const fileInput = useRef();
  const handleClick = () => {
    fileInput.current.click();
  };

  useEffect(() => {
    const photoURL = photo && URL.createObjectURL(photo);
    setPreviewPhoto(photoURL);
  }, [photo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className="d-flex gap-5" style={{ padding: "0px 200px" }}>
      <div>
        <img
          src={ArrowLeft}
          alt="<-"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <Form className="w-100" onSubmit={handleSubmit}>
        <div
          className="mx-auto mb-4"
          style={{ width: "96px", height: "96px" }}
          onClick={handleClick}
        >
          <div
            className="rounded-4"
            style={{
              cursor: "pointer",
              width: "96px",
              height: "96px",
            }}
          >
            {previewPhoto ? (
              <img
                src={previewPhoto}
                alt="Preview"
                className="rounded-4"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onLoad={() => URL.revokeObjectURL(previewPhoto)}
              />
            ) : (
              <img src={UploadPhoto} alt="Upload" />
            )}
          </div>
          <Form.Group>
            <Form.Control
              type="file"
              className="d-none"
              ref={fileInput}
              onChange={onPhoto}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Name*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nama"
            className="rounded-3"
            value={name}
            onChange={onName}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kota*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kota"
            className="rounded-3"
            value={kota}
            onChange={onKota}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Alamat*</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Contoh: Jalan Ikan Hiu 33"
            value={alamat}
            onChange={onAlamat}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>No Handphone*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contoh: +628123456789"
            value={noHandphone}
            onChange={onNoHandphone}
          />
        </Form.Group>

        <Button className="w-100" type="submit" disabled={isLoading}>
          {isLoading ? "Loading ..." : "Simpan"}
        </Button>
      </Form>
    </div>
  );
}
