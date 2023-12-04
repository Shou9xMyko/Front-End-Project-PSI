import "./CardDaftarJasa.css";
import NavbarsAdmin from "../../Navbars_Admin/Navbars_Admin";
import Sidebars from "../../sidebars/Sidebars";
import { Button, Form, Modal, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AddJasa, getJasa } from "../../../Redux/Action/JasaAction";
import { Vortex } from "react-loader-spinner";
import { renderToString } from "react-dom/server";
import EditJasa from "./ActionJasa/EditJasa/EditJasa";
import DeleteJasa from "./ActionJasa/DeleteJasa/DeleteJasa";
import { FaPlus } from "react-icons/fa6";

const CardDaftarJasa = () => {
  const { isLoading } = useSelector((state) => state.JasaReducer);
  const { daftarJasa } = useSelector((state) => state.JasaReducer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [jasa, setJasa] = useState({
    nama_jasa: "",
    kode_jasa: null,
    harga_jasa: "",
    gambar_jasa: null,
    keterangan: "",
  });

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    const file = name == "gambar_jasa" ? files[0] : null;

    setJasa({
      ...jasa,
      [name]: name == "gambar_jasa" ? file : value,
    });
  };

  const handleTambahJasa = () => {
    if (
      jasa.nama_jasa == "" &&
      jasa.kode_jasa == null &&
      jasa.harga_jasa == null &&
      jasa.gambar_jasa == null &&
      jasa.keterangan == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error 400",
        text: "Harap isi kolom inputan, untuk menambah jasa!",
      });
    } else if (jasa.nama_jasa == "") {
      Swal.fire({
        icon: "error",
        title: "Error 400",
        text: "Harap isi nama jasa!",
      });
    } else if (jasa.kode_jasa == null) {
      Swal.fire({
        icon: "error",
        title: "Error 400",
        text: "Harap isi kode jasa!",
      });
    } else if (jasa.harga_jasa == null) {
      Swal.fire({
        icon: "error",
        title: "Error 400",
        text: "Harap isi harga jasa!",
      });
    } else if (jasa.gambar_jasa == null) {
      Swal.fire({
        icon: "error",
        title: "Error 400",
        text: "Harap masukan gambar jasa!",
      });
    } else if (jasa.keterangan == "") {
      Swal.fire({
        icon: "error",
        title: "Error 400",
        text: "Harap isi keterangan jasa, jika tidak ada keterangan isikan '-' tanpa tanda kutip",
      });
    } else {
      dispatch(AddJasa(jasa));

      setJasa({
        nama_jasa: "",
        kode_jasa: null,
        harga_jasa: "",
        gambar_jasa: null,
        keterangan: "",
      });

      handleClose();
    }
  };

  const priceFormat = (textToFormat) => {
    return textToFormat.replace(/\d+/, (angka) =>
      parseInt(angka).toLocaleString("id-ID")
    );
  };

  useEffect(() => {
    let sweetAlertInstance = null;

    const showPopUpLoading = () => {
      if (isLoading) {
        const vortexComponent = (
          <>
            <Vortex
              visible={true}
              height="100"
              width="100"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
            <p className="mt-3 fw-bold fs-4 text-primary">Loading . . .</p>
          </>
        );

        const vortexHtmlString = renderToString(vortexComponent);

        sweetAlertInstance = Swal.fire({
          html: vortexHtmlString,
          showConfirmButton: false,
        });
      } else {
        if (sweetAlertInstance) {
          sweetAlertInstance.close();
        }
      }
    };

    showPopUpLoading();
  }, [isLoading]);

  useEffect(() => {
    dispatch(getJasa());
  }, []);

  return (
    <>
      <NavbarsAdmin />
      <div className="row m-0 mt-3">
        <div className="col-3 p-0">
          <Sidebars />
        </div>
        <div className="col p-0">
          <div className="container">
            <button
              className="btn btn-primary mb-4 fw-medium"
              onClick={handleShow}
            >
              <FaPlus className="mb-1" /> Tambah Jasa
            </button>
            <p className="text-end fw-bold fs-4">
              Total Jasa :{" "}
              <span className="text-primary">{daftarJasa.length}</span>
            </p>
            {/* Modal Tambah Jasa */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="modal-title fw-bold">
                  Tambah Jasa
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                <Form>
                  <Form.Group className="mb-3" controlId="Nama-Jasa">
                    <Form.Label className="text-black fw-medium">
                      Nama Jasa
                    </Form.Label>
                    <Form.Control
                      className="form-control-tambah-jasa shadow-none "
                      type="text"
                      placeholder="Masukan Nama Jasa"
                      name="nama_jasa"
                      onChange={handleInputChange}
                      maxLength={40}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="Kode-Jasa">
                    <Form.Label className="text-black fw-medium">
                      Kode Jasa
                    </Form.Label>
                    <Form.Control
                      className="form-control-kode-jasa shadow-none "
                      type="number"
                      placeholder="Masukan Kode Jasa"
                      name="kode_jasa"
                      onChange={handleInputChange}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="Harga-Jasa">
                    <Form.Label className="text-black fw-medium">
                      Harga Jasa
                    </Form.Label>
                    <Form.Control
                      className="form-control-harga-jasa shadow-none "
                      type="text"
                      placeholder="Masukan Harga Jasa"
                      name="harga_jasa"
                      onChange={handleInputChange}
                      maxLength={20}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="Gambar-Jasa">
                    <Form.Label className="text-black fw-medium">
                      Masukan Gambar Jasa
                    </Form.Label>
                    <Form.Control
                      className="shadow-none "
                      type="file"
                      name="gambar_jasa"
                      autoFocus
                      accept=".png,.jpg,.jpeg"
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3" controlId="Keterangan-Jasa">
                    <Form.Label className="text-black fw-medium">
                      Keterangan Jasa
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="keterangan"
                      className="shadow-none"
                      onChange={handleInputChange}
                      style={{ height: "100px" }}
                      maxLength={40}
                      placeholder="Masukan keterangan produk anda"
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <Button variant="secondary" onClick={handleClose}>
                  Batal
                </Button>
                <Button variant="primary" onClick={handleTambahJasa}>
                  Tambah
                </Button>
              </Modal.Footer>
            </Modal>

            {/* DAFTAR JASA */}
            <div
              className="row gap-4 m-0 border border-primary rounded px-5 py-5 bg-white"
              id="container-daftar-jasa"
            >
              {daftarJasa.length == 0 ? (
                <div className="d-flex justify-content-center align-items-center">
                  <h5>
                    Tidak ada jasa yang tersedia, silahkan tambahkan denga klik
                    tombol <span className="text-primary">`Tambah Jasa`</span>
                  </h5>
                </div>
              ) : (
                daftarJasa?.map((item) => {
                  return (
                    <div className="col-4 p-0" key={item.id}>
                      <div
                        className="card shadow"
                        style={{ width: "18rem", height: "85%" }}
                      >
                        <img
                          src={item.link_gambar_jasa}
                          className="card-img-top h-50 img-fluid"
                          id="admin-gambar-jasa"
                          alt={item.kode_jasa}
                        />
                        <hr className="mb-0 mt-0" />
                        <div className="card-body h-100">
                          <h5 className="card-title fw-bold">
                            {item.nama_jasa}
                          </h5>
                          <div className="d-flex m-0 p-0 justify-content-between">
                            <p className="card-text fw-medium">Harga</p>
                            <p className="card-text fw-medium">
                              Rp {priceFormat(item.harga_jasa)}
                            </p>
                          </div>
                          <p className="card-text mb-1 fw-bold">Keterangan</p>
                          <p className="card-text">{item.keterangan}</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-around mt-3 mb-0">
                        <EditJasa
                          id={item.id}
                          nama_jasa={item.nama_jasa}
                          kode_jasa={item.kode_jasa}
                          harga_jasa={item.harga_jasa}
                          keterangan={item.keterangan}
                          public_id_gambar={item.public_id_gambar}
                        />
                        <DeleteJasa
                          id={item.id}
                          public_id_gambar={item.public_id_gambar}
                          nama_jasa={item.nama_jasa}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDaftarJasa;
