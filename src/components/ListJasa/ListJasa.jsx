import "./ListJasa.css";
import Card from "react-bootstrap/Card";
import CardImage from "../../assets/Image_Card.png";
import InputSearchJasa from "../InputSearchJasa/InputSearchJasa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJasa } from "../../Redux/Action/JasaAction";

const ListJasa = () => {
  const cardData = new Array(20).fill(null);
  const { daftarJasa } = useSelector((state) => state.JasaReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJasa());
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          <h3>DAFTAR JASA</h3>
        </div>
        <div className="col-6 text-end">
          <h3>Total Jasa : {cardData.length}</h3>
        </div>
      </div>
      <InputSearchJasa />

      {/* Card */}
      <div className="row gy-4 gx-0 mt-1">
        {daftarJasa?.map((item) => {
          return (
            <div className="col-4 p-0" key={item.id}>
              <div
                className="card shadow"
                style={{ width: "18rem", height: "80%" }}
              >
                <img
                  src={item.link_gambar_jasa}
                  className="card-img-top h-50 img-fluid"
                  alt={item.kode_jasa}
                />
                <hr className="mt-3 mb-0" />
                <div className="card-body h-100">
                  <h5 className="card-title fw-bold">{item.nama_jasa}</h5>
                  <div className="d-flex m-0 p-0 justify-content-between">
                    <p className="card-text fw-medium">Harga</p>
                    <p className="card-text fw-medium">
                      Rp {item.harga_jasa.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <p className="card-text mb-1 fw-bold">Keterangan</p>
                  <p className="card-text mb-5">{item.keterangan}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListJasa;
