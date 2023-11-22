/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import Swal from "sweetalert2";
import UploadPhoto from "../../assets/img/upload-photo.png";
import { auth, db, storage } from "../../config/firebase";
import { Button, Container, Form } from "react-bootstrap";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function InfoProfile() {
  // State
  const navigate = useNavigate();
  const fileInput = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    photo_url: UploadPhoto,
    name: "",
    city: "",
    address: "",
    phone_number: "",
    email: "",
  });

  // Setting Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showCloseButton: true,
    showConfirmButton: false,
    color: "#FFFFFF",
  });

  // Fetch Data
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const unsub = onSnapshot(
        doc(db, "users", user.uid),
        (doc) => {
          setData(doc.data());
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);
          console.log(error);
          Toast.fire({
            text: "Terjadi suatu kesalahan, silahkan coba beberapa saat lagi",
            background: "#FA2C5A",
          });
        }
      );

      return unsub;
    });
  }, []);
  const handleClick = () => {
    fileInput.current.click();
  };

  // Validate is type of file
  const isFile = (input) => "File" in window && input instanceof File;

  // Upload Photo to Storage
  const handlePhoto = async () => {
    if (!data?.photo_url) return;
    if (isFile(data?.photo_url)) {
      const path = `users/${data?.photo_url?.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, data?.photo_url);

      await uploadTask;

      let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      return downloadURL;
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const photoURL = await handlePhoto();
    onAuthStateChanged(auth, (user) => {
      updateDoc(doc(db, "users", user.uid), {
        photo_url: photoURL ? photoURL : data?.photo_url,
        name: data?.name,
        city: data?.city,
        address: data?.address,
        phone_number: data?.phone_number,
        email: data?.email,
      })
        .then(() => {
          Toast.fire({
            text: "Berhasil menyimpan info akun",
            background: "#73CA5C",
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          Toast.fire({
            text: "Terjasi suatu kesalahan, silahkan coba lagi",
            background: "#FA2C5A",
          });
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
              {isFile(data?.photo_url) ? (
                <img
                  src={data?.photo_url && URL.createObjectURL(data?.photo_url)}
                  alt="Preview"
                  className="rounded-4"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <img
                  src={data?.photo_url}
                  alt="Upload"
                  className="rounded-4"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <Form.Group>
              <Form.Control
                type="file"
                className="d-none"
                ref={fileInput}
                onChange={(e) =>
                  setData((prev) => {
                    return { ...prev, photo_url: e.target.files[0] };
                  })
                }
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama"
              className="rounded-3"
              value={data?.name}
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City*</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              className="rounded-3"
              value={data?.city}
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, city: e.target.value };
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address*</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Contoh: Jalan Ikan Hiu 33"
              value={data?.address}
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, address: e.target.value };
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No Handphone*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Contoh: +628123456789"
              value={data?.phone_number}
              onChange={(e) =>
                setData((prev) => {
                  return { ...prev, phone_number: e.target.value };
                })
              }
            />
          </Form.Group>

          <Button className="w-100" type="submit" disabled={isLoading}>
            {isLoading ? "Loading ..." : "Simpan"}
          </Button>
        </Form>
      </div>
    </Container>
  );
}
