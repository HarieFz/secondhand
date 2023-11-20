import React from "react";
import Bell from "../../../assets/icon/bell.svg";
import Ellipse from "../../../assets/icon/ellipse.svg";
import Watch from "../../../assets/img/watch.png";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    created_at: "20 Nov, 13.18",
  },
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    bargain_price: "Rp 200.000",
    read: true,
    created_at: "19 Nov, 08.37",
  },
  {
    img: Watch,
    name: "Jam Tangan Casio",
    category: "Aksesoris",
    price: "Rp 250.000",
    bargain_price: "Rp 200.000",
    read: true,
    created_at: "19 Nov, 08.37",
  },
];

export default function NavNotification() {
  const unread = () => items.filter((item) => item.read === false).length;

  return (
    <NavDropdown
      title={
        <>
          <img src={Bell} alt="Bell" />
        </>
      }
      align="end"
    >
      <Dropdown.Header className="pb-0">
        <div className="d-flex justify-content-between">
          <p className="mb-0">Pesan</p>
          <p className="mb-0">Belum dibaca ({unread()})</p>
        </div>
        <hr className="mt-1 mb-0" />
      </Dropdown.Header>
      <div className="scrollbar">
        {items.map((item, index) => (
          <NavDropdown.Item
            className="pt-2 pb-0"
            style={{ width: "350px" }}
            key={index}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-2">
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
                {!item.read && (
                  <div>
                    <img src={Ellipse} alt="*" className="mb-2" />
                  </div>
                )}
              </div>
            </div>
            {index === items.length - 1 ? (
              <div className="pb-2" />
            ) : (
              <hr className="mb-0 mt-2" />
            )}
          </NavDropdown.Item>
        ))}
      </div>

      <NavDropdown.Item
        as={Link}
        to="/pesan"
        className="pt-0"
        style={{ textDecoration: "none" }}
      >
        <hr className="my-0" />
        <div className="d-flex justify-content-center mt-1">
          <p className="mb-0">Lihat Semuanya</p>
        </div>
      </NavDropdown.Item>
    </NavDropdown>
  );
}
