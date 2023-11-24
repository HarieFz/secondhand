import React, { Fragment, useEffect, useRef, useState } from "react";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import dataCurrentUser from "../../global/dataCurrentUser";
import RemoveX from "../../assets/icon/remove-x.svg";
import Toast from "../../components/confirmToast";
import UploadProduk from "../../assets/img/upload-produk.png";
import useFetchAllData from "../../hooks/query/useFetchAllData";
import { addDoc, collection } from "firebase/firestore";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";

export default function InfoProduk() {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);

  const fileInput = useRef([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([{ file: null, preview: null }]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state) {
      setName(state?.name);
      setPrice(state?.price);
      setCategory(state?.category);
      setDescription(state?.description);
      setImg(() => {
        const image = [];
        state?.img.map((item) => {
          return image.push({
            file: item.file,
            preview: URL.createObjectURL(item.file),
          });
        });

        return image;
      });
    }
  }, [state]);

  const onName = (e) => setName(e.target.value);
  const onPrice = (e) => setPrice(e.target.value);
  const onCategory = (e) => setCategory(e.target.value);
  const onDescription = (e) => setDescription(e.target.value);
  const onPhoto = (e, index) => {
    let data = [...img];
    if (e.target.name === "file") {
      data[index].file = e.target.files[0];
      data[index].preview =
        e.target.value && URL.createObjectURL(e.target.files[0]);
    }

    setImg(data);
  };

  const handleClick = (i) => {
    fileInput.current[i].click();
  };

  const addPhoto = () => {
    let newPhoto = { file: null, preview: null };

    setImg([...img, newPhoto]);
  };

  const removePhoto = (i) => {
    let newPhoto = [...img];
    newPhoto.splice(i, 1);
    setImg(newPhoto);
  };

  const _user = dataCurrentUser();
  const { data: user } = _user;

  const _categories = useFetchAllData("categories");
  const { data: categories, isLoading: loadingCategories } = _categories;

  const isEmpty = (element) =>
    element.file === null ||
    element.file === undefined ||
    element.preview === null ||
    element.preview === "";

  // Upload Photo to Storage
  const handlePhoto = async () => {
    if (!img) return;
    if (!img.some(isEmpty)) {
      const imgURL = [];

      for (const photo of img) {
        const path = `items/${photo?.file?.name}`;
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, photo?.file);

        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        imgURL.push(downloadURL);
      }

      return imgURL;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imgURL = await handlePhoto();
    addDoc(collection(db, "items"), {
      name: name,
      price: price,
      category: category,
      description: description,
      img_url: imgURL,
      interested: false,
      sold: false,
      seller: user,
    })
      .then(() => {
        navigate("/daftar-jual");
        setIsLoading(false);
        Toast.fire({
          text: "Produk berhasil diterbitkan",
          background: "#73CA5C",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        Toast.fire({
          text: "Terjadi suatu kesalahan, silahkan coba lagi",
          background: "#FA2C5A",
        });
      });
  };

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
                onClick={() =>
                  navigate("/preview-produk", {
                    state: {
                      name,
                      price,
                      category,
                      description,
                      img,
                      seller: user,
                    },
                  })
                }
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
