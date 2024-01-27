import "./FormCustomer.css";
import Navbars from "../../components/Navbar/Navbars";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { MdPayment } from "react-icons/md";
import { FaFileArchive } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FormCustomer = () => {
  const initialCartList = JSON.parse(sessionStorage.getItem("cart")) || [];

  const [listCheckout, setListCheckout] = useState(initialCartList);
  const [totalCheckOut, setTotalCheckOut] = useState(0);

  const navigate = useNavigate();

  const [dataPembeli, setDataPembeli] = useState({
    nama_pembeli: "",
    email_pembeli: "",
    handphone: "",
    alamat: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDataPembeli((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  useEffect(() => {
    const newTotalCheckout = listCheckout.reduce(
      (acc, item) => acc + item.total_harga,
      0
    );

    setTotalCheckOut(newTotalCheckout);
  }, [listCheckout]);

  return (
    <div id="wrapper">
      <Navbars />
      <div className="container my-5">
        <h4 className="text-dark fw-bold">Detail Pembelian</h4>
        <hr className="m-0 mb-4" />
        <div className="row m-0 gy-5 gy-xl-0">
          <div className="col-12 px-4 px-md-0 col-lg-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label mb-1">
                  Nama Pembeli <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Masukan Nama Lengkap"
                  name="nama_pembeli"
                  value={dataPembeli.nama_pembeli}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label mb-1">
                  Email Pembeli <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control shadow-none"
                  placeholder="Masukan Email Anda"
                  name="email_pembeli"
                  value={dataPembeli.email_pembeli}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label mb-1">
                  Handphone <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  accept="[0-9]*"
                  className="form-control shadow-none"
                  placeholder="Isi Nomor Handphone Anda"
                  name="handphone"
                  value={dataPembeli.handphone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label mb-1">
                  Alamat Lengkap <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control shadow-none"
                  id="alamat-pembeli"
                  placeholder="Isi Alamat Anda"
                  name="alamat"
                  value={dataPembeli.alamat}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-medium">
                <MdPayment className="fs-4" /> Lanjutkan Pembelian
              </button>
            </form>
          </div>
          <div className="col-12 col-lg-5">
            <div id="wrapper-total-belanja">
              <p className="text-dark fw-bold py-2 bg-body-secondary m-0 text-center">
                Total Belanja
              </p>
              <div className="border border-body-secondary py-3 px-4">
                <div className="d-flex align-items-center gap-3">
                  <MdOutlinePayment className="text-secondary fs-2" />
                  <div className="d-flex justify-content-between w-100">
                    <p className="text-dark m-0 fw-bold">Total</p>
                    <p className="text-danger m-0 fw-bold">
                      Rp {totalCheckOut.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-dark fw-bold py-2 bg-body-secondary m-0  text-center">
                Ringkasan Belanja
              </p>
              <div
                className="border border-body-secondary py-3 px-4"
                id="wrapper-ringkasan-belanja"
              >
                {listCheckout.map((item) => {
                  return (
                    <div className="row mb-2" key={item.id_jasa}>
                      <div className="col-1 d-flex align-items-center  p-0">
                        <FaFileArchive className="text-secondary fs-2" />
                      </div>

                      <div className="col-9">
                        <p className="text-dark fw-medium m-0">
                          {item.nama_jasa}
                        </p>
                      </div>
                      <div className="col-2 p-0  d-flex align-items-center">
                        <p className="text-dark text-center m-0 w-100">
                          x{" "}
                          <span className="text-danger fw-bold">
                            {item.jumlah_unit}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormCustomer;
