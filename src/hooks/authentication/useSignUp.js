/* eslint-disable react-hooks/exhaustive-deps */
import Auth from "../../utils/auth";
import Swal from "sweetalert2";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useSignUp(name, email, password) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [payload, mutate] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const register = useCallback(() => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name,
          email,
        });
        Auth.storeUserInfoToCookie(user);
        navigate("/");
        Toast.fire({
          icon: "success",
          title: "Register Berhasil",
          color: "#FFFFFF",
          background: "#73CA5C",
        });
        mutate(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        mutate(false);
        setIsLoading(false);
        if (err.code === "auth/email-already-in-use") {
          return Toast.fire({
            icon: "error",
            title: "Register Gagal!",
            text: "Email telah terdaftar",
            color: "#FFFFFF",
            background: "#FA2C5A",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Ada suatu kesalahan, silahkan coba lagi",
            color: "#FFFFFF",
            background: "#FA2C5A",
          });
        }
      });
  }, [email, password, name]);

  useEffect(() => {
    if (payload) {
      setIsLoading(true);
      register();
    }
  }, [register, payload]);

  return { mutate, isLoading };
}
