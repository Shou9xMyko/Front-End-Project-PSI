import "./ListJasa.css";
import { BsCartPlus } from "react-icons/bs";
import InputSearchJasa from "../InputSearchJasa/InputSearchJasa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AddCart, getJasa } from "../../Redux/Action/JasaAction";

const ListJasa = () => {
  const { daftarJasa } = useSelector((state) => state.JasaReducer);
  const dispatch = useDispatch();

  const handleAddCartJasa = (
    gambar_jasa,
    nama_jasa,
    harga_jasa,
    keterangan_jasa
  ) => {
    const priceFormat = parseInt(harga_jasa.match(/\d+/)[0]);

    const dataToCart = {
      gambar_jasa,
      nama_jasa,
      priceFormat,
      keterangan_jasa,
    };

    dispatch(AddCart(dataToCart));
  };

  const priceFormat = (textToFormat) => {
    return textToFormat.replace(/\d+/, (angka) =>
      parseInt(angka).toLocaleString("id-ID")
    );
  };

  useEffect(() => {
    dispatch(getJasa());
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          <h3 className="fw-bold">DAFTAR JASA</h3>
        </div>
        <div className="col-6 text-end">
          <h3 className="fw-bold">
            Total Jasa :{" "}
            <span className="text-primary">
              {typeof daftarJasa == "string" ? 0 : daftarJasa.length}
            </span>
          </h3>
        </div>
      </div>
      <InputSearchJasa />

      {/* Card */}
      <div
        className="row m-0 pb-5 gy-4 gy-lg-5 mt-1 bg-white rounded-3 shadow justify-content-center"
        id="container-daftar-jasa-homepage"
      >
        {typeof daftarJasa == "string" ? (
          <h4 className="text-center fw-medium">
            Tidak ada jasa dengan kata kunci &ldquo;
            <span className="text-primary">{daftarJasa}</span>&ldquo;, coba
            dengan kata kunci lain
          </h4>
        ) : (
          daftarJasa?.map((item) => {
            return (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center "
                key={item.id}
              >
                <div
                  className="card shadow"
                  id="card-jasa"
                  style={{ width: "18rem", height: "30rem" }}
                >
                  <img
                    src={item.link_gambar_jasa}
                    className="card-img-top h-50 img-fluid"
                    alt={item.kode_jasa}
                    id="gambar-list-jasa"
                  />
                  <hr className="mt-0 mb-0" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.nama_jasa}</h5>
                    <div className="d-flex m-0 p-0 justify-content-between">
                      <p className="card-text fw-medium">Harga</p>
                      <p className="card-text fw-medium">
                        Rp {priceFormat(item.harga_jasa)}
                      </p>
                    </div>
                    <p className="card-text mb-1 fw-bold">Keterangan</p>
                    <p className="card-text mb-5">{item.keterangan}</p>
                    <div
                      className="d-flex justify-content-end"
                      style={{ marginBottom: "3.5rem" }}
                    >
                      <button
                        id="btn-pesan-homepage"
                        className="fw-medium"
                        onClick={() =>
                          handleAddCartJasa(
                            item.link_gambar_jasa,
                            item.nama_jasa,
                            item.harga_jasa,
                            item.keterangan
                          )
                        }
                      >
                        <BsCartPlus className="fs-5 mb-1 me-1" /> Masukan
                        Keranjang
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListJasa;
