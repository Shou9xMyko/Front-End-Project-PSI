import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { EditJasaItem } from "../../../../../Redux/Action/JasaAction";

const EditJasa = (dataJasa) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setDataJasaValue({
      id: dataJasa.id,
      nama_jasa: dataJasa.nama_jasa,
      kode_jasa: dataJasa.kode_jasa,
      harga_jasa: dataJasa.harga_jasa,
      keterangan: dataJasa.keterangan,
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [dataJasaValue, setDataJasaValue] = useState({
    id: dataJasa.id,
    nama_jasa: dataJasa.nama_jasa,
    kode_jasa: dataJasa.kode_jasa,
    harga_jasa: dataJasa.harga_jasa,
    keterangan: dataJasa.keterangan,
    public_id_gambar: dataJasa.public_id_gambar,
  });

  const [editGambarJasa, setEditGambarJasa] = useState(null);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setDataJasaValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditJasa = () => {
    dispatch(EditJasaItem(dataJasaValue, editGambarJasa));
    setShow(false);
  };

  useEffect(() => {
    setDataJasaValue({
      id: dataJasa.id,
      nama_jasa: dataJasa.nama_jasa,
      kode_jasa: dataJasa.kode_jasa,
      harga_jasa: dataJasa.harga_jasa,
      keterangan: dataJasa.keterangan,

      public_id_gambar: dataJasa.public_id_gambar,
    });
  }, [dataJasa]);

  return (
    <>
      <button
        className="btn btn-success fw-medium px-4 py-0"
        onClick={handleShow}
      >
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title fw-bold">Edit Jasa</Modal.Title>
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
                onChange={handleChange}
                value={dataJasaValue.nama_jasa}
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
                value={dataJasaValue.kode_jasa}
                onChange={handleChange}
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
                value={dataJasaValue.harga_jasa}
                onChange={handleChange}
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
                autoFocus
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setEditGambarJasa(e.target.files[0])}
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
                value={dataJasaValue.keterangan}
                onChange={handleChange}
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
          <Button variant="primary" onClick={handleEditJasa}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditJasa;
