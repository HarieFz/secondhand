import React from "react";
import Ellipse from "../assets/icon/ellipse.svg";
import Watch from "../assets/img/watch.png";

export default function Notification() {
  return (
    <div className="bg-body border rounded-4 p-4" style={{ width: "400px" }}>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-2">
          <img
            src={Watch}
            alt="Items"
            width="48px"
            height="48px"
            className="rounded-3"
          />
          <div>
            <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
              Penawaran produk
            </p>
            <p className="m-0">Jam Tangan Casio</p>
            <p className="m-0">Rp 250.000</p>
            <p className="m-0">Ditawar Rp 200.000</p>
          </div>
        </div>
        <div className="d-flex gap-2">
          <div>
            <p className="m-0 text-black-50" style={{ fontSize: "12px" }}>
              20 Nov, 14.20
            </p>
          </div>
          <div>
            <img src={Ellipse} alt="*" className="mb-2" />
          </div>
        </div>
      </div>
      <hr className="mt-3 mb-0" />
    </div>
  );
}
