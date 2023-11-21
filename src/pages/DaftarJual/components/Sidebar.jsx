import React from "react";
import BoxGray from "../../../assets/icon/box-gray.svg";
import BoxPurple from "../../../assets/icon/box-purple.svg";
import ChevronRightGray from "../../../assets/icon/chevron-right-gray.svg";
import ChevronRightPurple from "../../../assets/icon/chevron-right-purple.svg";
import HeartGray from "../../../assets/icon/heart-gray.svg";
import HeartPurple from "../../../assets/icon/heart-purple.svg";
import DollarGray from "../../../assets/icon/dollar-gray.svg";
import DollarPurple from "../../../assets/icon/dollar-purple.svg";

export default function Sidebar({
  allProduct,
  setAllProduct,
  interested,
  setInterested,
  sold,
  setSold,
}) {
  const onAllProduct = () => {
    setAllProduct(true);
    setInterested(false);
    setSold(false);
  };

  const onInterested = () => {
    setAllProduct(false);
    setInterested(true);
    setSold(false);
  };

  const onSold = () => {
    setAllProduct(false);
    setInterested(false);
    setSold(true);
  };

  return (
    <div className="bg-body border rounded-4 p-4">
      <h5 className="mb-4">Kategori</h5>

      <div
        className="d-flex justify-content-between"
        style={{ cursor: "pointer" }}
        onClick={() => onAllProduct()}
      >
        <div className="d-flex align-items-center gap-2">
          <img src={allProduct ? BoxPurple : BoxGray} alt="Box" />
          <p
            className="m-0"
            style={{ color: ` ${allProduct ? "#7126B5" : "#8A8A8A"}` }}
          >
            Semua Produk
          </p>
        </div>
        <img src={allProduct ? ChevronRightPurple : ChevronRightGray} alt=">" />
      </div>
      <div
        style={{
          height: "1px",
          backgroundColor: `${allProduct ? "#7126B5" : "#8A8A8A"}`,
          border: "none",
          margin: "15px 0px",
        }}
      />

      <div
        className="d-flex justify-content-between"
        style={{ cursor: "pointer" }}
        onClick={() => onInterested()}
      >
        <div className="d-flex align-items-center gap-2">
          <img src={interested ? HeartPurple : HeartGray} alt="Box" />
          <p
            className="m-0"
            style={{ color: `${interested ? "#7126B5" : "#8A8A8A"}` }}
          >
            Diminati
          </p>
        </div>
        <img src={interested ? ChevronRightPurple : ChevronRightGray} alt=">" />
      </div>
      <div
        style={{
          height: "1px",
          backgroundColor: `${interested ? "#7126B5" : "#8A8A8A"}`,
          border: "none",
          margin: "15px 0px",
        }}
      />

      <div
        className="d-flex justify-content-between"
        style={{ cursor: "pointer" }}
        onClick={() => onSold()}
      >
        <div className="d-flex align-items-center gap-2">
          <img src={sold ? DollarPurple : DollarGray} alt="Box" />
          <p
            className="m-0"
            style={{ color: `${sold ? "#7126B5" : "#8A8A8A"}` }}
          >
            Terjual
          </p>
        </div>
        <img src={sold ? ChevronRightPurple : ChevronRightGray} alt=">" />
      </div>
    </div>
  );
}
