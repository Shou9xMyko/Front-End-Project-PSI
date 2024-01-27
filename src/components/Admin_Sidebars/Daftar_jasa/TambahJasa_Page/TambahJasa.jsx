import { useState } from "react";
import NavbarsAdmin from "../../../Navbars_Admin/Navbars_Admin";
import "./TambahJasa.css";
import Footer from "../../../Footer/Footer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { AddJasa } from "../../../../Redux/Action/JasaAction";
import Loading from "../../../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const TambahJasa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    nama_jasa: "",
    harga_jasa: "",
    kode_jasa: "",
    foto_jasa: null,
    waktu_pengerjaan: "",
  });

  const [rincianJasa, setRincianJasa] = useState("");

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleAddImage = (event) => {
    const { name, files } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: files[0],
    }));
  };

  const handlePublish = () => {
    if (input.nama_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Nama jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (input.kode_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Kode pengerjaan jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (input.foto_jasa == null) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Foto jasa tidak boleh kosong, karena foto jasa akan ditampilkan",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (input.harga_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Harga jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (input.waktu_pengerjaan == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Waktu pengerjaan jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Anda yakin ingin publish jasa ini?",
        text: 'Klik "Yes" untuk mempublish jasa ini',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            nama_jasa: input.nama_jasa,
            kode_jasa: input.kode_jasa,
            foto_jasa: input.foto_jasa,
            rincian_jasa: rincianJasa,
            harga_jasa: input.harga_jasa,
            waktu_pengerjaan: input.waktu_pengerjaan,
          };

          dispatch(AddJasa(data));
        }
      });
    }
  };

  const handleCancel = async () => {
    await Swal.fire({
      icon: "info",
      title: "Info",
      text: "Anda akan diarahkan ke halaman admin daftar jasa",
      showConfirmButton: false,
      timer: 2500,
    });

    navigate("/admin/daftar-jasa");
  };

  return (
    <>
      <NavbarsAdmin />
      <Loading />

      <div className="container my-5">
        <div className="text-start my-4 ">
          <Link
            to="/admin/daftar-jasa"
            className="btn btn-white border-0 p-0 fw-medium"
            id="btn-dashboard"
          >
            <IoArrowBack /> Admin Daftar Jasa
          </Link>
        </div>

        <h3 className="fw-bold text-dark mb-4">Tambah Jasa</h3>
        <div className="row border border-2 rounded p-5 bg-white m-0">
          <div className="col p-0">
            <div className="row m-0 gap-4">
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-12 col-md-2 d-flex align-items-center">
                    <p className="fw-bold mb-2 mb-md-0">
                      Nama Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-10">
                    <input
                      name="nama_jasa"
                      className="form-control"
                      type="text"
                      id="formFile"
                      value={input.nama_jasa}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-12 col-md-2 d-flex align-items-center">
                    <p className="fw-bold mb-2 mb-md-0">
                      Kode Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-10">
                    <input
                      name="kode_jasa"
                      className="form-control"
                      type="text"
                      id="formFile"
                      value={input.kode_jasa}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row m-0">
                  <div className="col-12 col-md-2 p-0 ">
                    <p className="text-dark fw-bold mb-2 mb-md-0">
                      Foto Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-10 p-0 ">
                    <div className="mb-3">
                      <input
                        name="foto_jasa"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleAddImage}
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-12 col-md-2 d-flex align-items-center">
                    <p className="fw-bold mb-2 mb-md-0">
                      Rincian Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-10">
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        setRincianJasa(editor.getData());
                      }}
                      config={{
                        toolbar: {
                          items: [
                            "undo",
                            "redo",
                            "|",
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "|",
                            "link",
                            "blockQuote",
                            "insertTable",
                            "tableColumn",
                            "tableRow",
                            "|",
                            "bulletedList",
                            "numberedList",
                          ],
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-12 col-md-2 d-flex align-items-center">
                    <p className="fw-bold mb-2 mb-md-0">
                      Harga Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-10">
                    <input
                      name="harga_jasa"
                      className="form-control"
                      type="number"
                      id="formFile"
                      value={input.harga_jasa}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-12 col-md-2 d-flex align-items-center">
                    <p className="fw-bold mb-2 mb-md-0">
                      Pengerjaan <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-12 col-md-10">
                    <input
                      name="waktu_pengerjaan"
                      className="form-control"
                      type="number"
                      accept="[0-9]*"
                      placeholder="Contoh: input 10 = 10 Menit, input 2 = 2 Menit, input 120 = 2 Jam, begitu seterusnya"
                      id="formFile"
                      value={input.waktu_pengerjaan}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row justify-content-center mt-5">
                  <div className="col-4 bg-primarys text-center">
                    <button
                      className="btn btn-danger fw-medium"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-4 bg-warnings text-center">
                    <button
                      className="btn btn-primary fw-medium"
                      onClick={handlePublish}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TambahJasa;
