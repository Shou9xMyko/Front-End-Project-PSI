import { useEffect, useState } from "react";
import "./PaymentMethod.css";
import Form from "react-bootstrap/Form";
import { MdOutlinePayment } from "react-icons/md";
import { FaFileArchive } from "react-icons/fa";
import ShopeePayLogo from "../../../assets/ShopePayLogo.jpg";
import { FaWhatsapp } from "react-icons/fa";

const PaymentMethod = () => {
  const initialCartList = JSON.parse(sessionStorage.getItem("cart")) || [];

  const [listCheckout, setListCheckout] = useState(initialCartList);

  const [selectedOption, setSelectedOption] = useState("");
  const [totalCheckOut, setTotalCheckOut] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  console.log(selectedOption);

  useEffect(() => {
    const newTotalCheckout = listCheckout.reduce(
      (acc, item) => acc + item.total_harga,
      0
    );

    setTotalCheckOut(newTotalCheckout);
  }, [listCheckout]);

  return (
    <div className="row">
      <div className="col-6">
        <div className="d-flex flex-column h-100">
          <Form.Select
            aria-label="Default select example"
            value={selectedOption}
            onChange={handleSelectChange}
            className="shadow-none"
          >
            <option>Pilih Pembayaran</option>
            <option value="qriz">QRIS</option>
            <option value="dana">Dana</option>
            <option value="shopeepay">ShopePay</option>
          </Form.Select>

          {selectedOption == "shopeepay" && (
            <img
              src={ShopeePayLogo}
              className="img-fluid mt-5"
              alt="Ceritanya Barcode YGY"
            />
          )}

          <p className="fw-medium text-dark mt-auto m-0">
            Note{" "}
            <span className="text-danger">
              * Jika sudah melakukan pembayaran mohon kirim bukti pembayaran ke
              WhatsApp admin untuk proses konfirmasi pemesanan dan informasi
              antrian{" "}
            </span>
          </p>
        </div>
      </div>
      <div className="col-6">
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
                    <p className="text-dark fw-medium m-0">{item.nama_jasa}</p>
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

          <button className="btn btn-success fw-medium mt-5 w-100">
            <FaWhatsapp className="fs-5 mb-1" /> Kirim bukti pembayaran ke
            WhatsApp kami
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
