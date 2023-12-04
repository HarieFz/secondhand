import React, { createContext, useEffect, useState } from "react";
import dataCurrentUser from "../global/dataCurrentUser";
import Toast from "../components/confirmToast";
import useFetchAllData from "../hooks/query/useFetchAllData";
import { db, storage } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useFetchDataById from "../hooks/query/useFetchDataById";

const EditProduk = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([{ file: null, preview: null }]);
  const [isLoading, setIsLoading] = useState(false);

  const _categories = useFetchAllData("categories");
  const _items = useFetchDataById("items", id);
  const _user = dataCurrentUser();
  const { data: categories, isLoading: loadingCategories } = _categories;
  const { data: items } = _items;
  const { data: user } = _user;

  const navigate = useNavigate();
  const isFile = (input) => "File" in window && input instanceof File;
  const isEmpty = (element) =>
    element.file === null ||
    element.file === undefined ||
    element.preview === null ||
    element.preview === "";

  const isEmptyItems = (obj) => {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (isEmptyItems(items)) return;
    setName(items?.name);
    setPrice(items?.price);
    setCategory(items?.category);
    setDescription(items?.description);
    setImg(() => {
      const image = [];
      items?.img_url?.map((item) => {
        return image.push({
          file: item,
          preview: item,
        });
      });

      return image;
    });
  }, [items]);

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
    let newPhoto = { file: null, preview: null };

    setImg([...img, newPhoto]);
  };

  const removePhoto = (i) => {
    let newPhoto = [...img];
    newPhoto.splice(i, 1);
    setImg(newPhoto);
  };

  const handlePhoto = async () => {
    if (img.some(isEmpty)) return;
    const imgURL = [];
    const imgFile = [];

    const resultDownloadURL = [];

    for (const _image of img) {
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
    updateDoc(doc(db, "items", items?.id), {
      name: name,
      price: price,
      category: category,
      description: description,
      img_url: imgURL,
      interested: items.interested,
      sold: items.sold,
      seller: user,
    })
      .then((data) => {
        console.log(data);
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
    id,
    name,
    price,
    category,
    description,
    img,
    seller: user,
    isLoading,
    categories,
    loadingCategories,
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

export const EditProdukContext = createContext();

export default function EditProdukProvider() {
  return (
    <EditProdukContext.Provider value={{ ...EditProduk() }}>
      <Outlet />
    </EditProdukContext.Provider>
  );
}
