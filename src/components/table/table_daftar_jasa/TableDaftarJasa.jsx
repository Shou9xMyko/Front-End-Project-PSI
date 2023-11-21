import "./TableDaftarJasa.css";
import NavbarsAdmin from "../../Navbars_Admin/Navbars_Admin";
import Sidebars from "../../sidebars/Sidebars";
import { Button, Form, Modal, Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AddJasa } from "../../../Redux/Action/JasaAction";

const TableDaftarJasa = () => {
  const { isLoadingAddJasa } = useSelector((state) => state.JasaReducer);
  const dispatch = useDispatch();

  const loop = new Array(20).fill(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [jasa, setJasa] = useState({
    nama_jasa: "",
    kode_jasa: null,
    harga_jasa: null,
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
        harga_jasa: null,
        gambar_jasa: null,
        keterangan: "",
      });

      handleClose();
    }
  };

  useEffect(() => {
    console.log("status nya ", isLoadingAddJasa);
  }, [isLoadingAddJasa]);

  return (
    <>
      <NavbarsAdmin />
      <div className="row m-0 mt-3">
        <div className="col-3 p-0">
          <Sidebars />
        </div>
        <div className="col p-0">
          <div className="container">
            <button className="btn btn-primary mb-4" onClick={handleShow}>
              Tambah Jasa
            </button>

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
                      type="number"
                      placeholder="Masukan Harga Jasa"
                      name="harga_jasa"
                      onChange={handleInputChange}
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
              className="row m-0 gy-4 border border-primary rounded pb-4 px-4 bg-white"
              id="container-daftar-jasa"
            >
              {loop.map((item, index) => {
                return (
                  <div className="col-4 p-0" key={index}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      <Card.Body>
                        <Card.Title>Print PI</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the cards content.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <div className="d-flex justify-content-around mt-3">
                      <button className="btn btn-success fw-medium px-4 py-0">
                        Edit
                      </button>
                      <button className="btn btn-danger fw-medium py-1">
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <Table bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Jasa</th>
                  <th>Kode Jasa</th>
                  <th>Harga Jasa</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDaftarJasa;
