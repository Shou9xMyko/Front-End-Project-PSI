import "./AdminDetailJasa.css";
import NavbarsAdmin from "./../Navbars_Admin/Navbars_Admin";
import Footer from "../Footer/Footer";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { IoArrowBack } from "react-icons/io5";

const AdminDetailJasa = () => {
  const { daftarJasa } = useSelector((state) => state.JasaReducer);

  const { id } = useParams();

  const jasa = daftarJasa.filter((item) => item.id == id);

  const formatedDateAndTime = (dateToFormat) => {
    const dateObject = new Date(dateToFormat);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString("id-ID", { month: "long" });
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const formattedDate = `${day} ${month} ${year} : Pukul ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} Menit`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours < 24) {
      if (remainingMinutes === 0) {
        return `${hours} Jam`;
      } else {
        return `${hours} Jam ${remainingMinutes} Menit`;
      }
    }

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (remainingMinutes === 0 && remainingHours === 0) {
      return `${days} Hari`;
    } else if (remainingHours === 0) {
      return `${days} Hari ${remainingMinutes} Menit`;
    } else if (remainingMinutes === 0) {
      return `${days} Hari ${remainingHours} Jam`;
    } else {
      return `${days} Hari ${remainingHours} Jam ${remainingMinutes} Menit`;
    }
  };

  return (
    <div id="wrapper">
      <NavbarsAdmin />
      <div className="container">
        <div className="row m-0 mb-5">
          <div className="text-start my-5 ">
            <Link
              to="/admin/daftar-jasa"
              className="btn btn-white border-0 p-0 fw-medium"
              id="btn-dashboard"
            >
              <IoArrowBack /> Admin Daftar Jasa
            </Link>
          </div>
          {jasa.map((item) => {
            return (
              <div className="m-0" key={item.id}>
                <div className="col-12">
                  <div className="row m-0">
                    <div className="col-auto col-lg-6">
                      <img
                        src={`data:image/png;base64,${item.foto_jasa}`}
                        className="img-fluid w-100"
                      />
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="row m-0 mt-4 mt-md-4 mt-lg-0">
                        <div className="col-12">
                          <div className="row m-0">
                            <div className="col-4 p-0">
                              <p className="fw-bold">Nama Jasa</p>
                            </div>
                            <div className="col-1 p-0">
                              <p className="fw-bold text-center">:</p>
                            </div>
                            <div className="col-7 p-0">{item.nama_jasa}</div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row m-0">
                            <div className="col-4 p-0">
                              <p className="fw-bold">Kode Jasa</p>
                            </div>
                            <div className="col-1 p-0">
                              <p className="fw-bold text-center">:</p>
                            </div>
                            <div className="col-7 p-0">{item.kode_jasa}</div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row m-0">
                            <div className="col-4 p-0">
                              <p className="fw-bold">Harga Jasa</p>
                            </div>
                            <div className="col-1 p-0">
                              <p className="fw-bold text-center">:</p>
                            </div>
                            <div className="col-7 p-0">
                              {item.harga_jasa.toLocaleString("id-ID")}
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row m-0">
                            <div className="col-4 p-0">
                              <p className="fw-bold">Pengerjaan</p>
                            </div>
                            <div className="col-1 p-0">
                              <p className="fw-bold text-center">:</p>
                            </div>
                            <div className="col-7 p-0">
                              {formatDuration(item.waktu_pengerjaan)}
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row m-0">
                            <div className="col-4 p-0">
                              <p className="fw-bold">Dibuat Pada</p>
                            </div>
                            <div className="col-1 p-0">
                              <p className="fw-bold text-center">:</p>
                            </div>
                            <div className="col-7 p-0">
                              {formatedDateAndTime(item.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="row m-0">
                            <div className="col-4 p-0">
                              <p className="fw-bold">Diupdate pada</p>
                            </div>
                            <div className="col-1 p-0">
                              <p className="fw-bold text-center">:</p>
                            </div>
                            <div className="col-7 p-0">
                              {formatedDateAndTime(item.updatedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <h5 className="text-center fw-bold mt-5">Rincian Jasa</h5>
                  <div className="text-justify mt-5 mx-3">
                    {parse(item.rincian_jasa)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDetailJasa;
