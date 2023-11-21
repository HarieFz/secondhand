/* eslint-disable react-hooks/rules-of-hooks */
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Toast from "../components/confirmToast";

const currentUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

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

  return { data, isLoading };
};

export default currentUser;
