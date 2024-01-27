import { useState } from "react";
import "./EditJasa.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavbarsAdmin from "../../../../Navbars_Admin/Navbars_Admin";
import Loading from "../../../../Loading/Loading";
import Footer from "../../../../Footer/Footer";
import { EditJasaItem } from "../../../../../Redux/Action/JasaAction";

const EditJasa = () => {
  const { id } = useParams();
  const { daftarJasa } = useSelector((state) => state.JasaReducer);

  const dispatch = useDispatch();

  const dataToEdit = daftarJasa.filter((item) => item.id == id);

  const [inputEdit, setInputEdit] = useState({
    edit_nama_jasa: dataToEdit[0].nama_jasa,
    edit_kode_jasa: dataToEdit[0].kode_jasa,
    edit_harga_jasa: dataToEdit[0].harga_jasa,
    edit_rincian_jasa: dataToEdit[0].rincian_jasa,
    edit_foto_jasa: null,
    edit_waktu_pengerjaan: dataToEdit[0].waktu_pengerjaan,
  });

  const handleInputEditChange = (e) => {
    const { name, value } = e.target;

    setInputEdit((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleInputImageChange = (e) => {
    const file = e.target.files[0];

    setInputEdit((prevInput) => ({
      ...prevInput,
      edit_foto_jasa: file,
    }));
  };

  const handlePublish = () => {
    if (inputEdit.edit_nama_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Nama jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (inputEdit.edit_kode_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Kode pengerjaan jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (inputEdit.edit_harga_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Harga jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (inputEdit.edit_waktu_pengerjaan == "") {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Waktu pengerjaan jasa tidak boleh kosong",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Anda yakin ingin publish jasa yang telah di edit ?",
        text: 'Klik "Yes" untuk mempublish jasa yang di edit',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const data = {
            id: dataToEdit[0].id,
            nama_jasa: inputEdit.edit_nama_jasa,
            kode_jasa: inputEdit.edit_kode_jasa,
            foto_jasa: inputEdit.edit_foto_jasa,
            rincian_jasa: inputEdit.edit_rincian_jasa,
            harga_jasa: inputEdit.edit_harga_jasa,
            waktu_pengerjaan: inputEdit.edit_waktu_pengerjaan,
          };

          dispatch(EditJasaItem(data));
        }
      });
    }
  };
  return (
    <>
      <NavbarsAdmin />
      <Loading />
      <div className="container my-5">
        <h3 className="fw-bold text-dark">Tambah Jasa</h3>
        <div className="row border border-2 rounded p-5 bg-white m-0">
          <div className="col p-0">
            <div className="row m-0 gap-4">
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <p className="fw-bold m-0">
                      Nama Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col">
                    <input
                      name="edit_nama_jasa"
                      className="form-control"
                      type="text"
                      id="formFile"
                      value={inputEdit.edit_nama_jasa}
                      onChange={handleInputEditChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <p className="fw-bold m-0">
                      Kode Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col">
                    <input
                      name="edit_kode_jasa"
                      className="form-control"
                      type="text"
                      id="formFile"
                      value={inputEdit.edit_kode_jasa}
                      onChange={handleInputEditChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row m-0">
                  <div className="col-2 p-0 ">
                    <p className="text-dark fw-bold m-0 mb-1">
                      Foto Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-10 p-0 ">
                    <div className="mb-3">
                      <input
                        name="edit_foto_jasa"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleInputImageChange}
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                      <div className="form-text">
                        <span className="text-danger me-2">*</span>
                        Masukan foto jasa untuk merubah foto jasa, jika tidak
                        maka foto jasa tidak akan berubah
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <p className="fw-bold m-0">
                      Rincian Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-10">
                    <CKEditor
                      editor={ClassicEditor}
                      data={inputEdit.edit_rincian_jasa}
                      onChange={(event, editor) => {
                        setInputEdit((prevInput) => ({
                          ...prevInput,
                          edit_rincian_jasa: editor.getData(),
                        }));
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
                  <div className="col-2 d-flex align-items-center">
                    <p className="fw-bold m-0">
                      Harga Jasa <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-10">
                    <input
                      name="edit_harga_jasa"
                      className="form-control"
                      type="number"
                      id="formFile"
                      value={inputEdit.edit_harga_jasa}
                      onChange={handleInputEditChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 p-0">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <p className="fw-bold m-0">
                      Pengerjaan <span className="text-danger">*</span>
                    </p>
                  </div>
                  <div className="col-10">
                    <input
                      name="edit_waktu_pengerjaan"
                      className="form-control"
                      type="text"
                      id="formFile"
                      value={inputEdit.edit_waktu_pengerjaan}
                      onChange={handleInputEditChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row justify-content-center mt-5">
                  <div className="col-4 bg-primarys text-center">
                    <button className="btn btn-danger fw-medium">
                      Cancel Edit
                    </button>
                  </div>
                  <div className="col-4 bg-warnings text-center">
                    <button
                      className="btn btn-primary fw-medium"
                      onClick={handlePublish}
                    >
                      Publish Edit
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

export default EditJasa;
