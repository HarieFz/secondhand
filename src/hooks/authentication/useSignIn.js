/* eslint-disable react-hooks/exhaustive-deps */
import Auth from "../../utils/auth";
import Swal from "sweetalert2";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignIn = (email, password) => {
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

  const login = useCallback(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        Auth.storeUserInfoToCookie(user);
        Toast.fire({
          icon: "success",
          text: "Login Berhasil",
          color: "#FFFFFF",
          background: "#73CA5C",
        });
        mutate(false);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        mutate(false);
        setIsLoading(false);
        console.error(err);
        if (err.code === "auth/user-not-found") {
          return Toast.fire({
            icon: "success",
            title: "Login Gagal!",
            text: "User tidak ditemukan",
            color: "#FFFFFF",
            background: "#73CA5C",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Login Gagal!",
            text: "Telah terjadi suatu kesalahan, silahkan coba lagi.",
            color: "#FFFFFF",
            background: "#FA2C5A",
          });
        }
      });
  }, [email, password]);

  useEffect(() => {
    if (payload) {
      setIsLoading(true);
      login();
    }
  }, [login, payload]);

  return { mutate, isLoading };
};

export default useSignIn;
