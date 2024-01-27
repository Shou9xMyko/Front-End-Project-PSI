import "./ListJasa.css";
import { BsCartPlus } from "react-icons/bs";
import InputSearchJasa from "../InputSearchJasa/InputSearchJasa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AddCart, ClearCart, getJasa } from "../../Redux/Action/JasaAction";
import { useNavigate } from "react-router-dom";

const ListJasa = () => {
  const { daftarJasa } = useSelector((state) => state.JasaReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [jasa, setJasa] = useState(daftarJasa);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchJasa = (event) => {
    const keyword = event.target.value;

    const findJasa = daftarJasa.filter((item) => {
      return (
        item.nama_jasa.toLowerCase().includes(keyword.toLowerCase()) ||
        item.rincian_jasa.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    setJasa(findJasa);
    setSearchValue(keyword);
  };

  useEffect(() => {
    setJasa(daftarJasa);
  }, [daftarJasa]);

  useEffect(() => {
    dispatch(getJasa());
  }, [dispatch]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          <h3 className="fw-bold">DAFTAR JASA</h3>
        </div>
        <div className="col-6 text-end">
          <h3 className="fw-bold">
            Total Jasa : <span className="text-primary">{jasa.length}</span>
          </h3>
        </div>
      </div>
      {/* SEARCH JASA */}
      <div className="input-group mb-3 mt-2" id="input-group-search-jasa">
        <input
          type="text"
          className="form-control py-2 ps-4 shadow-none"
          placeholder="Cari Jasa..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchValue}
          onChange={handleSearchJasa}
        />
      </div>

      {/* Card */}
      <div
        className="row m-0 pb-5 gy-4 gy-lg-5 mt-1 bg-white rounded-3 shadow justify-content-center"
        id="container-daftar-jasa-homepage"
      >
        {jasa.length == 0 ? (
          <h4 className="text-center fw-medium">
            Tidak ada jasa dengan kata kunci &ldquo;
            <span className="text-primary">{searchValue}</span>&ldquo;, coba
            dengan kata kunci lain
          </h4>
        ) : daftarJasa.length == 0 ? (
          <h5 className="text-center">Tidak ada jasa yang tersedia</h5>
        ) : (
          jasa?.map((item) => {
            return (
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center "
                key={item.id}
              >
                <div
                  className="card shadow"
                  id="card-jasa"
                  style={{ width: "18rem", height: "100%" }}
                  onClick={() => navigate(`/detail-jasa/${item.id}`)}
                >
                  <img
                    src={`data:image/png;base64,${item.foto_jasa}`}
                    className="card-img-top h-75 img-fluid"
                    alt={item.kode_jasa}
                    id="gambar-list-jasa"
                  />
                  <hr className="mt-0 mb-0" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.nama_jasa}</h5>
                    <div className="d-flex m-0 p-0 justify-content-between">
                      <p className="card-text fw-medium">Harga</p>
                      <p className="card-text fw-medium">
                        Rp {item.harga_jasa.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="text-end">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/jasa/detail-jasa/${item.id}`)}
                      >
                        Lihat Detail...
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
