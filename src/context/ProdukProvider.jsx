import React, { createContext, useState } from "react";
import dataCurrentUser from "../global/dataCurrentUser";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Outlet, useNavigate } from "react-router-dom";
import { storage } from "../config/firebase";

const Produk = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([{ file: null, preview: null }]);
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

  return {
    name,
    price,
    category,
    description,
    img,
    seller: user,
    onName,
    onPrice,
    onCategory,
    onDescription,
    onPhoto,
    addPhoto,
    removePhoto,
    isEmpty,
    handlePhoto,
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
