import "./admin.css";
import Sidebars from "../sidebars/Sidebars";
import NavbarsAdmin from "../Navbars_Admin/Navbars_Admin";
import AdminMenu from "../admin_menu/Admin_Menu";

const Admin = () => {
  return (
    <div className="row m-0">
      <div className="col-12 " style={{ backgroundColor: "#2563eb" }}>
        <NavbarsAdmin />
      </div>
      <div className="col-12 pt-3">
        <div className="row">
          <div className="col-3 p-0">
            <Sidebars />
          </div>
          <div className="col-9 p-0">
            <AdminMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
