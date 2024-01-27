import "./CardDaftarJasa.css";
import NavbarsAdmin from "../../Navbars_Admin/Navbars_Admin";
import Sidebars from "../../sidebars/Sidebars";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJasa } from "../../../Redux/Action/JasaAction";
import DeleteJasa from "./ActionJasa/DeleteJasa/DeleteJasa";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import Footer from "../../Footer/Footer";
import { MdEdit } from "react-icons/md";

const CardDaftarJasa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initial state untuk data jasa dan kata kunci pencarian
  const { daftarJasa } = useSelector((state) => state.JasaReducer);
  const [jasa, setJasa] = useState(daftarJasa);
  const [keywordSearch, setKeywordSearch] = useState("");

  const handleSearchJasa = (event) => {
    const keyword = event.target.value;

    const findJasa = daftarJasa.filter((item) => {
      return (
        item.nama_jasa.toLowerCase().includes(keyword.toLowerCase()) ||
        item.rincian_jasa.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    setJasa(findJasa);
    setKeywordSearch(keyword);
  };

  useEffect(() => {
    setJasa(daftarJasa);
  }, [daftarJasa]);

  useEffect(() => {
    dispatch(getJasa());
  }, [daftarJasa]);

  return (
    <>
      <NavbarsAdmin />
      <Loading />
      <div className="row m-0 mb-5">
        <div className="col p-0 bg-warnings">
          <div className="pt-4">
            <div className="d-flex bg-dangers justify-content-between">
              <Sidebars />

              <div className="text-end pe-4">
                <Link
                  to="/admin/tambah-jasa"
                  className="btn btn-primary mb-4 fw-medium"
                >
                  <FaPlus className="mb-1" /> Tambah Jasa
                </Link>
                <p className=" fw-bold fs-4">
                  Total Jasa :{" "}
                  <span className="text-primary">{jasa.length}</span>
                </p>
              </div>
            </div>

            {/* Admin Search Jasa */}

            <div className="container d-flex justify-content-center">
              <div
                className="input-group mb-4 mx-3 "
                id="wrapper-admin-input-search-jasa"
              >
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder="Cari Jasa"
                  onChange={handleSearchJasa}
                />
              </div>
            </div>

            {/* DAFTAR JASA */}
            <div
              className="border border-primary rounded bg-white justify-content-center p-4 mx-4"
              id="container-daftar-jasa"
            >
              <div className="row gy-5 gx-4 justify-content-center">
                {daftarJasa.length == 0 ? (
                  <div className="col-12 p-0">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "25vh" }}
                    >
                      <h5>
                        Tidak ada jasa yang tersedia, silahkan tambahkan dengan
                        klik tombol{" "}
                        <span className="text-primary">`Tambah Jasa`</span>
                      </h5>
                    </div>
                  </div>
                ) : jasa.length == 0 ? (
                  <div className="col-12 p-0">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "25vh" }}
                    >
                      <h5>
                        Jasa yang anda cari dengan kata kunci &quot;
                        <span className="fw-bold text-danger">
                          {keywordSearch}
                        </span>
                        &quot; tidak ditemukan, harap periksa kembali kata kunci
                        yang anda masukan
                      </h5>
                    </div>
                  </div>
                ) : (
                  jasa?.map((item) => {
                    return (
                      <div className="col-12 col-md-6 col-xl-3" key={item.id}>
                        <div className="wrapper-card d-flex justify-content-center">
                          <div
                            className="card shadow"
                            style={{ width: "18rem", height: "90%" }}
                            onClick={() =>
                              navigate(`/admin/detail-jasa/${item.id}`)
                            }
                          >
                            <img
                              src={`data:image/png;base64,${item.foto_jasa}`}
                              className="card-img-top img-fluid"
                              style={{ height: "80%" }}
                              id="admin-gambar-jasa"
                            />
                            <hr className="mb-0 mt-0" />
                            <div className="card-body h-100">
                              <h5 className="card-title fw-bold">
                                {item.nama_jasa}
                              </h5>
                              <div className="d-flex m-0 p-0 justify-content-between">
                                <p className="card-text fw-medium">Harga</p>
                                <p className="card-text fw-medium">
                                  Rp {item.harga_jasa.toLocaleString("id-ID")}
                                </p>
                              </div>
                              <div className="text-end">
                                <button
                                  className="btn btn-primary btn-sm fw-medium "
                                  id="btn-card-lihat-detail"
                                  onClick={() =>
                                    navigate(`/admin/detail-jasa/${item.id}`)
                                  }
                                >
                                  Lihat Detail...
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-around mt-3 mb-0">
                          <button
                            className="btn btn-success fw-medium px-3 py-0"
                            onClick={() =>
                              navigate(`/admin/edit-jasa/${item.id}`)
                            }
                          >
                            <MdEdit /> Edit
                          </button>
                          <DeleteJasa id={item.id} nama_jasa={item.nama_jasa} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardDaftarJasa;
