import NavbarsAdmin from "../../Navbars_Admin/Navbars_Admin";
import Sidebars from "../../sidebars/Sidebars";
import Table from "react-bootstrap/Table";
import "./TableDaftarJasa.css";

const TableDaftarJasa = () => {
  return (
    <>
      <NavbarsAdmin />
      <div className="row m-0 mt-3">
        <div className="col-3 p-0">
          <Sidebars />
        </div>
        <div className="col p-0">
          <div className="container">
            <button className="btn btn-primary mb-4">Tambah Jasa</button>
            <Table bordered>
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
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDaftarJasa;
