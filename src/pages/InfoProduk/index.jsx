import React, { Fragment, useContext, useRef } from "react";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import RemoveX from "../../assets/icon/remove-x.svg";
import UploadProduk from "../../assets/img/upload-produk.png";
import useFetchAllData from "../../hooks/query/useFetchAllData";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ProdukContext } from "../../context/ProdukProvider";

export default function InfoProduk() {
  const fileInput = useRef([]);
  const _categories = useFetchAllData("categories");
  const { data: categories, isLoading: loadingCategories } = _categories;
  const {
    name,
    price,
    category,
    description,
    img,
    onName,
    onPrice,
    onCategory,
    onDescription,
    onPhoto,
    addPhoto,
    removePhoto,
    isEmpty,
    isLoading,
    navigate,
    handleSubmit,
  } = useContext(ProdukContext);

  const handleClick = (i) => {
    fileInput.current[i].click();
  };

  return (
    <Container>
      <div className="d-flex gap-5" style={{ padding: "0px 200px" }}>
        <div>
          <img
            src={ArrowLeft}
            alt="<-"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
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

          <Form.Label>Kategori</Form.Label>
          <Form.Select
            className="mb-3"
            style={{ fontSize: "14px" }}
            onChange={onCategory}
            value={category}
          >
            <option
              className="text-black-50"
              style={{ fontSize: "14px" }}
              value=""
            >
              Pilih Kategori
            </option>
            {categories?.map((item) => (
              <Fragment key={item.id}>
                {loadingCategories && (
                  <option style={{ fontSize: "14px" }} value={item.category}>
                    {item.category}
                  </option>
                )}

                <option style={{ fontSize: "14px" }} value={item.category}>
                  {item.category}
                </option>
              </Fragment>
            ))}
          </Form.Select>

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
            {img?.map((item, index) => (
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

                {index && index === img.length - 1 && (
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

            {img.length < 4 ? (
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
                onClick={() => navigate("/preview-produk")}
                disabled={
                  !name ||
                  !price ||
                  !category ||
                  !description ||
                  img.some(isEmpty) ||
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
                  img.some(isEmpty) ||
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
