import NavbarsAdmin from "../../Navbars_Admin/Navbars_Admin";
import "./TableTransaksi.css";
import Table from "react-bootstrap/Table";
import Sidebars from "../../sidebars/Sidebars";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const TableTransaksi = () => {
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
            <Table bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Customer</th>
                  <th>Tanggal</th>
                  <th>JASA</th>
                  <th>Harga</th>
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
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
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
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableTransaksi;
