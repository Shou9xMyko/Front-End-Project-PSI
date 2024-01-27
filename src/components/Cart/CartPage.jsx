import "./CartPage.css";
import { useEffect, useState } from "react";
import Navbars from "../Navbar/Navbars";
import Footer from "../Footer/Footer";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CartPage = () => {
  const initialCartList = JSON.parse(sessionStorage.getItem("cart")) || [];
  const navigate = useNavigate();

  const [cartList, setCartList] = useState(initialCartList);

  const [totalHarga, setTotalHarga] = useState(0);

  const handleDeleteCart = (id_jasa, nama_jasa) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      html: `Anda akan menghapus jasa di keranjang anda dengan nama <strong>${nama_jasa}</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCartList = cartList.filter(
          (item) => item.id_jasa != id_jasa || item.nama_jasa != nama_jasa
        );

        setCartList(updatedCartList);

        Swal.fire({
          title: "Terhapus!",
          text: "Berhasil menghapus jasa di keranjang! ",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  const handleInAndDecrement = (index, operation) => {
    setCartList((prevCartList) => {
      const updatedCartList = [...prevCartList];

      if (operation === "decrement" && updatedCartList[index].jumlah_unit > 1) {
        updatedCartList[index].jumlah_unit -= 1;
      } else if (operation === "increment") {
        updatedCartList[index].jumlah_unit += 1;
      }

      updatedCartList[index].total_harga =
        updatedCartList[index].jumlah_unit * updatedCartList[index].harga_jasa;

      return updatedCartList;
    });
  };

  useEffect(() => {
    const newTotalAllPrice = cartList.reduce(
      (acc, item) => acc + item.total_harga,
      0
    );
    setTotalHarga(newTotalAllPrice);

    sessionStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <div id="wrapper">
      <Navbars />
      {/* Cart Page */}
      <div className="container my-5">
        <h3 className="text-dark m-0 mb-3">Daftar Belanja</h3>
        {cartList.length == 0 ? (
          <div className="alert alert-danger mt-3" role="alert">
            Tidak ada jasa di keranjang, Silahkan tambahkan jasa kedalam
            keranjang. Klik tombol &quot;
            <span className="fw-bold">Lanjutkan Belanja</span>&quot; untuk
            kembali ke halaman awal
          </div>
        ) : (
          cartList.map((item, index) => (
            <div
              className="border border-secondary-subtle p-3"
              id={"wrapperCart"}
              key={`cartItem-${item.id_jasa}`}
            >
              <div className="row m-0 gap-2 gap-md-0">
                <div className="col-12 col-md-6 bg-secondarys p-0">
                  <div className="row">
                    <div className="col-1 p-0 bg-warnings d-flex align-items-center justify-content-center">
                      <FaRegTrashCan
                        className="icon-trash fs-5"
                        onClick={() =>
                          handleDeleteCart(item.id_jasa, item.nama_jasa)
                        }
                      />
                    </div>
                    <div className="col-4 p-0 bg-danger">
                      <img
                        src={`data:image/png;base64,${item.foto_jasa}`}
                        className="img-fluid h-100"
                        id="img-cart"
                        alt="gambar testing"
                      />
                    </div>
                    <div className="col-7">
                      <p className="fw-medium">{item.nama_jasa}</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-0">
                  <div className="row">
                    <div className="col-4  p-0 bg-dangers text-center">
                      <p className="m-0 fw-bold">Harga</p>
                      <p className="m-0 text-price ">
                        Rp {item.harga_jasa.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="col-4 p-0 bg-warnings ">
                      <p className="m-0 text-center fw-bold">Jumlah Unit</p>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className=""
                          id="btn-min"
                          onClick={() =>
                            handleInAndDecrement(index, "decrement")
                          }
                        >
                          -
                        </button>
                        <div className="wrapper-cart-jumlah-input">
                          <input
                            type="number"
                            pattern="[0-9]*"
                            className="form-control shadow-none"
                            value={item.jumlah_unit}
                            onChange={(e) => {
                              setCartList((prevCartList) => {
                                const updatedCartList = [...prevCartList];
                                updatedCartList[index].jumlah_unit = parseInt(
                                  e.target.value,
                                  10
                                );
                                updatedCartList[index].total_harga =
                                  updatedCartList[index].jumlah_unit *
                                  updatedCartList[index].harga_jasa;
                                return updatedCartList;
                              });
                            }}
                          />
                        </div>
                        <button
                          className=""
                          id="btn-plus"
                          onClick={() =>
                            handleInAndDecrement(index, "increment")
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-4 p-0 bg-dangers text-center">
                      <p className="m-0 fw-bold">Total Harga</p>
                      <p className="m-0 text-total-price">
                        Rp {item.total_harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="d-flex justify-content-end mt-4">
          <div className="wrapper-total-btn-bayar">
            <p className="text-dark">
              Total Harga Jasa :{" "}
              <span className="text-danger fw-bold ms-5">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </p>
            <div className="d-flex gap-3">
              <button id="btn-lanjutkan-belanja" onClick={() => navigate("/")}>
                Lanjutkan Belanja
              </button>
              {cartList.length != 0 && (
                <button id="btn-checkout" onClick={() => navigate("/payment")}>
                  Bayar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
