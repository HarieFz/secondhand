import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import RemoveX from "../../assets/icon/remove-x.svg";
import Swal from "sweetalert2";
import UploadProduk from "../../assets/img/upload-produk.png";

export default function InfoProduk() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([{ file: null, preview: null }]);
  const [isLoading, setIsLoading] = useState(false);

  const fileInput = useRef([]);
  const handleClick = (i) => {
    fileInput.current[i].click();
  };

  const onName = (e) => setName(e.target.value);
  const onPrice = (e) => setPrice(e.target.value);
  const onCategory = (e) => setCategory(e.target.value);
  const onDescription = (e) => setDescription(e.target.value);
  const onPhoto = (e, index) => {
    let data = [...photos];
    if (e.target.name === "file") {
      data[index].file = e.target.files[0];
      data[index].preview =
        e.target.value && URL.createObjectURL(e.target.files[0]);
    }

    setPhotos(data);
  };

  const addPhoto = () => {
    let newPhoto = { file: null, preview: null };

    setPhotos([...photos, newPhoto]);
  };

  const removePhoto = (i) => {
    let newPhoto = [...photos];
    newPhoto.splice(i, 1);
    setPhotos(newPhoto);
  };

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
    setIsLoading(true);
    navigate("/daftar-jual");
    Toast.fire({
      text: "Produk berhasil diterbitkan",
    });
    setIsLoading(false);
  };

  const isEmpty = (element) =>
    element.file === null ||
    element.file === undefined ||
    element.preview === null ||
    element.preview === "";

  return (
    <Container>
      <div className="d-flex gap-5" style={{ padding: "0px 200px" }}>
        <div>
          <img
            src={ArrowLeft}
            alt="<-"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <Form className="w-100">
          <Form.Group className="mb-3">
            <Form.Label>Nama Produk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama"
              className="rounded-3"
              value={name}
              onChange={onName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga Produk</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rp 0,00"
              className="rounded-3"
              value={price}
              onChange={onPrice}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kategori</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kategori"
              className="rounded-3"
              value={category}
              onChange={onCategory}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Contoh: Jalan Ikan Hiu 33"
              value={description}
              onChange={onDescription}
            />
          </Form.Group>

          <ul
            className="d-flex align-items-center gap-3 px-0 mb-4"
            style={{ listStyleType: "none" }}
          >
            {photos?.map((item, index) => (
              <li
                style={{
                  cursor: "pointer",
                  width: "96px",
                  height: "96px",
                }}
                key={index}
              >
                {!item.file ? (
                  <div
                    className="rounded-4"
                    style={{
                      width: "96px",
                      height: "96px",
                      position: "absolute",
                    }}
                    onClick={() => handleClick(index)}
                  >
                    <img
                      src={UploadProduk}
                      alt="Upload"
                      style={{
                        width: "96px",
                        height: "96px",
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={item.preview}
                    alt="Produk"
                    className="rounded-4"
                    style={{
                      width: "96px",
                      height: "96px",
                      position: "absolute",
                      objectFit: "cover",
                    }}
                    onClick={() => handleClick(index)}
                    onLoad={() => URL.revokeObjectURL(item.preview)}
                  />
                )}

                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    name="file"
                    className="d-none"
                    style={{ width: "96px", height: "96px" }}
                    ref={(el) => (fileInput.current[index] = el)}
                    onChange={(e) => onPhoto(e, index)}
                  />
                </Form.Group>

                {index && index === photos.length - 1 && (
                  <div
                    style={{
                      position: "relative",
                      width: "90px",
                      left: "73px",
                      bottom: "15px",
                    }}
                    onClick={() => removePhoto(index)}
                  >
                    <img src={RemoveX} alt="" />
                  </div>
                )}
              </li>
            ))}

            {photos.length < 4 ? (
              <div>
                <Button variant="outline-primary" onClick={addPhoto}>
                  Tambah
                </Button>
              </div>
            ) : (
              <></>
            )}
          </ul>

          <Row className="d-flex gap-3">
            <Col>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={() =>
                  navigate("/preview-produk", {
                    state: { name, price, category, description, photos },
                  })
                }
                disabled={
                  !name ||
                  !price ||
                  !category ||
                  !description ||
                  photos.some(isEmpty) ||
                  isLoading
                }
              >
                Preview
              </Button>
            </Col>
            <Col>
              <Button
                className="w-100"
                onClick={handleSubmit}
                disabled={
                  !name ||
                  !price ||
                  !category ||
                  !description ||
                  photos.some(isEmpty) ||
                  isLoading
                }
              >
                {isLoading ? "Loading ..." : "Terbitkan"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}
