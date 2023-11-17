import { Table } from "react-bootstrap";
import "./TableLaporanKeuangan.css";
import Sidebars from "../../sidebars/Sidebars";
import NavbarsAdmin from "../../Navbars_Admin/Navbars_Admin";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const TableLaporanKeuangan = () => {
  return (
    <>
      <NavbarsAdmin />
      <div className="row m-0 mt-3">
        <div className="col-3 p-0">
          <Sidebars />
        </div>
        <div className="col p-0">
          <div className="container">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Cari Daftar Transaksi 🤯"
                className="shadow-none"
              />
            </InputGroup>
            <h3 className="mt-4 text-end fw-bold">
              Total Transaksi : Rp <span className="text-primary">120.000</span>
            </h3>
            <Table bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Customer</th>
                  <th>Tanggal</th>
                  <th>JASA</th>
                  <th>Harga</th>
                  <th>Jenis Pembayaran</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@fat</td>
                  <td>@fat</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
            <h4 className="">Total data : 3</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableLaporanKeuangan;
