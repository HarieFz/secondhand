import React, { useState } from "react";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import ModalTerimaTawaran from "./components/ModalTerimaTawaran";
import User from "../../assets/img/user.png";
import Watch from "../../assets/img/watch.png";
import Whatsapp from "../../assets/icon/whatsapp.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalStatus from "./components/ModalStatus";

const buyer = {
  img: User,
  name: "Pembeli",
  kota: "Kota",
};

const item = {
  img: Watch,
  name: "Jam Tangan Casio",
  category: "Aksesoris",
  price: "Rp 250.000",
  bargain_price: "Rp 200.000",
  read: false,
  created_at: "20 Nov, 14.30",
};

export default function Pesan() {
  const navigate = useNavigate();
  const [accept, setAccept] = useState(false);
  console.log(accept);

  return (
    <div className="d-flex gap-5" style={{ padding: "0px 200px" }}>
      <div>
        <img
          src={ArrowLeft}
          alt="<-"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-100">
        <div className="d-flex align-items-center bg-body border rounded-4 p-3 mb-4">
          <img src={User} alt="user" className="me-3 rounded" />
          <div>
            <p className="m-0">Nama Penjual</p>
            <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
              Kota
            </p>
          </div>
        </div>

        <div>
          <h5>Daftar Produkmu yang Ditawar</h5>
          <div className="my-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                <img
                  src={item.img}
                  alt="Items"
                  width="48px"
                  height="48px"
                  style={{ objectFit: "cover" }}
                  className="rounded-3"
                />
                <div>
                  <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                    Penawaran produk
                  </p>
                  <p className="m-0">{item.name}</p>
                  <p className="m-0">{item.price}</p>
                  <p className="m-0">Ditawar {item.bargain_price}</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div>
                  <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
                    {item.created_at}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {accept ? (
            <div className="d-flex justify-content-end gap-3">
              <ModalStatus setAccept={setAccept} />
              <Button style={{ width: "158px" }}>
                Hubungi di <img src={Whatsapp} alt="Whatsapp" />
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-end gap-3">
              <Button variant="outline-primary" style={{ width: "158px" }}>
                Tolak
              </Button>
              <ModalTerimaTawaran
                buyer={buyer}
                item={item}
                setAccept={setAccept}
              />
            </div>
          )}
          <hr />
        </div>
      </div>
    </div>
  );
}
