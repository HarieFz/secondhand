import React, { createContext, useState } from "react";
import dataCurrentUser from "../global/dataCurrentUser";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Outlet, useNavigate } from "react-router-dom";
import { db, storage } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import Toast from "../components/confirmToast";

const Produk = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([{ file: null, preview: null }]);
  const [isLoading, setIsLoading] = useState(false);
  const _user = dataCurrentUser();
  const { data: user } = _user;

  const navigate = useNavigate();

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

  const addPhoto = () => {
    let Photo = { file: null, preview: null };

    setImg([...img, Photo]);
  };

  const removePhoto = (i) => {
    let Photo = [...img];
    Photo.splice(i, 1);
    setImg(Photo);
  };

  const isEmpty = (element) =>
    element.file === null ||
    element.file === undefined ||
    element.preview === null ||
    element.preview === "";

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

  return {
    name,
    price,
    category,
    description,
    img,
    seller: user,
    isLoading,
    onName,
    onPrice,
    onCategory,
    onDescription,
    onPhoto,
    addPhoto,
    removePhoto,
    isEmpty,
    handleSubmit,
    navigate,
  };
};

export const ProdukContext = createContext();

export default function ProdukProvider() {
  return (
    <ProdukContext.Provider value={{ ...Produk() }}>
      <Outlet />
    </ProdukContext.Provider>
  );
}
