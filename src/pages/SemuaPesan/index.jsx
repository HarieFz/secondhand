import React from "react";
import ArrowLeft from "../../assets/icon/arrow-left.svg";
import Ellipse from "../../assets/icon/ellipse.svg";
import Watch from "../../assets/img/watch.png";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const items = [
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    bargain_price: "Rp 200.000",
    read: false,
    created_at: "20 Nov, 14.30",
  },
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    bargain_price: "Rp 200.000",
    read: false,
    created_at: "20 Nov, 14.30",
  },
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    bargain_price: "Rp 200.000",
    read: true,
    created_at: "20 Nov, 14.30",
  },
];

export default function SemuaPesan() {
  const navigate = useNavigate();

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
        <div className="w-100">
          <h4 className="mb-4">Pesan</h4>
          {items.map((item, index) => (
            <div key={index}>
              <div
                className="list-message p-3"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => navigate("/pesan")}
              >
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
                      <p
                        className="m-0 text-black-50"
                        style={{ fontSize: "12px" }}
                      >
                        Penawaran produk
                      </p>
                      <p className="m-0">{item.name}</p>
                      <p className="m-0">{item.price}</p>
                      <p className="m-0">Ditawar {item.bargain_price}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <div>
                      <p
                        className="m-0 text-black-50"
                        style={{ fontSize: "12px" }}
                      >
                        {item.created_at}
                      </p>
                    </div>
                    {!item.read && (
                      <div>
                        <img src={Ellipse} alt="*" className="mb-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {index === items.length - 1 ? (
                <div />
              ) : (
                <hr className="mt-0 mb-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
