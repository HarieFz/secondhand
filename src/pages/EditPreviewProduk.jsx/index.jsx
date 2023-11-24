import React, { useState } from "react";
import dataCurrentUser from "../../global/dataCurrentUser";
import Toast from "../../components/confirmToast";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { db, storage } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditPreviewProduk() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const _user = dataCurrentUser();
  const { data: user } = _user;

  const isFile = (input) => "File" in window && input instanceof File;

  // Upload Photo to Storage
  const handlePhoto = async () => {
    if (!state.img) return;
    const imgURL = [];
    const imgFile = [];

    const resultDownloadURL = [];

    for (const _image of state.img) {
      if (isFile(_image.file)) {
        imgFile.push(_image.file);
      } else {
        imgURL.push(_image.file);
      }
    }

    for (const image of imgFile) {
      const path = `items/${image?.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      resultDownloadURL.push(downloadURL);
    }

    const imagesURL = imgURL.concat(resultDownloadURL);

    return imagesURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imgURL = await handlePhoto();
    updateDoc(doc(db, "items", state?.id), {
      name: state.name,
      price: state.price,
      category: state.category,
      description: state.description,
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
      <div style={{ padding: "0px 100px", marginBottom: "30px" }}>
        <Row>
          <Col lg={8}>
            <Carousel className="rounded-4 border">
              {state?.img?.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={
                      isFile(image.file)
                        ? URL.createObjectURL(image.file)
                        : image.file
                    }
                    alt=""
                    width="600px"
                    height="436px"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="bg-body border rounded-4 p-3 mt-4">
              <h5>Deskripsi</h5>
              <p>{state.description}</p>
            </div>
          </Col>
          <Col lg={4}>
            <div className="bg-body border border-2 rounded-4 p-3 mb-3">
              <p className="mb-1 fw-bold">{state.name}</p>
              <p className="text-black-50" style={{ fontSize: "12px" }}>
                {state.category}
              </p>
              <p className="m-0 fw-bold mb-3">{state.price}</p>

              <div className="mb-2">
                <Button
                  className="d-block w-100"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading ..." : "Terbitkan"}
                </Button>
              </div>

              <div>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() =>
                    navigate("/edit-info-produk", {
                      state: {
                        id: state.id,
                        name: state.name,
                        price: state.price,
                        category: state.category,
                        description: state.description,
                        img: state.img,
                        seller: state.seller,
                      },
                    })
                  }
                  disabled={isLoading}
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="d-flex bg-body border rounded-4 p-3">
              <img
                src={state.seller.photo_url}
                alt="user"
                className="me-3 rounded"
                width="48px"
                height="48px"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0">{state.seller.name}</p>
                <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                  {state.seller.city}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
