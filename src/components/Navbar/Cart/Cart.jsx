import "./Cart.scss";
import "./Cart.css";

import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

const Cart = () => {
  const initialCartList = JSON.parse(sessionStorage.getItem("cart")) || [];

  const [listCart, setListCart] = useState(initialCartList);

  const [showTooltip, setShowTooltip] = useState(false);
  const [totalKeranjang, setTotalKeranjang] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const newTotalAllPrice = listCart.reduce(
      (acc, item) => acc + item.total_harga,
      0
    );
    setTotalKeranjang(newTotalAllPrice);
  }, [listCart]);

  return (
    <OverlayTrigger
      trigger={["click", "hover"]}
      placement="bottom"
      show={showTooltip}
      onToggle={() => setShowTooltip(true)}
      overlay={
        <Tooltip id="custom-tooltip">
          {listCart.length == 0 ? (
            <>
              <div className="d-flex justify-content-between align-items-center my-1 ">
                <p className="fw-bold fs-6 m-0 text-dark">
                  Keranjang ({listCart.length})
                </p>
                <IoMdCloseCircle
                  className="text-danger text-end "
                  id="tooltip-close-button"
                  onClick={() => setShowTooltip(false)}
                />
              </div>
              <hr className="m-0" />
              <div className="alert alert-danger mt-3" role="alert">
                Tidak ada jasa di keranjang
              </div>
              <hr className="m-0" />
              <div className="d-flex justify-content-between mt-2">
                <p className="text-end fs-6 fw-bold">Total</p>
                <p className="text-end fs-6 fw-bold text-danger">Rp 0</p>
              </div>
              <div className="d-felx">
                <button
                  className="btn btn-primary fw-bold rounded-0 w-100"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Lihat Keranjang
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between my-1">
                <p className="fw-bold fs-6 m-0 text-dark">
                  Keranjang ({listCart.length})
                </p>
                <IoMdCloseCircle
                  className="text-danger text-end"
                  id="tooltip-close-button"
                  onClick={() => setShowTooltip(false)}
                />
              </div>
              <hr className="m-0" />
              <div className="m-0 p-0" id="container-cart-jasa">
                {listCart?.map((item, index) => {
                  return (
                    <div className="row my-3" key={index}>
                      <div className="col-3 ps-2 pe-0 bg-dangers">
                        <img
                          src={`data:image/png;base64,${item.foto_jasa}`}
                          className="img-fluid "
                          style={{ width: "80%", height: "50px" }}
                        />
                      </div>
                      <div className="col-4  p-0 d-flex align-items-center">
                        <p
                          className="m-0 w-100 fw-bold fs-6 text-start"
                          id="tooltip-nama-jasa"
                        >
                          {item.nama_jasa}
                        </p>
                      </div>
                      <div className="col-auto p-0 bg-primarys d-flex align-items-center">
                        <p
                          className="m-0 w-100 fw-bold fs-6"
                          style={{ color: "#EE4D2D" }}
                        >
                          Rp {item.harga_jasa.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="col d-flex align-items-center text-end me-2">
                        <p className="m-0 w-100 fw-bold fs-6">
                          <span className="text-secondary">x</span>{" "}
                          {item.jumlah_unit}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="m-0" />
              <div className="d-flex justify-content-between mt-3">
                <p className="text-end fs-6 fw-bold">Total</p>
                <p className="text-end fs-6 fw-bold text-danger">
                  Rp {totalKeranjang.toLocaleString("id-ID")}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex m-0">
                <button
                  className="w-100 btn mt-3 fw-medium rounded-0"
                  id="btn-cart-lihat-keranjang"
                  onClick={() => navigate("/cart")}
                  // onClick={handleClearCart}
                >
                  <FaTrashAlt
                    className="mb-1 me-1"
                    style={{ fontSize: "15px" }}
                  />
                  Lihat Keranjang
                </button>
                <button
                  className="w-100 btn mt-3 fw-medium rounded-0"
                  id="btn-cart-checkout"
                  onClick={() => navigate("/payment")}
                >
                  <MdOutlineShoppingCartCheckout
                    style={{ fontSize: "20px" }}
                    className="mb-1 me-1"
                  />
                  Bayar
                </button>
              </div>
            </>
          )}
        </Tooltip>
      }
    >
      <Nav.Link className="position-relative text-end">
        <FiShoppingCart
          className="fs-3 me-1 mt-1 "
          style={{ color: "#2563eb" }}
        />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fw-medium">
          {listCart.length}
        </span>
      </Nav.Link>
    </OverlayTrigger>
  );
};

export default Cart;
