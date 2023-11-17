import "./Admin_Menu.css";
import { TbMenuOrder } from "react-icons/tb";
import { MdMiscellaneousServices } from "react-icons/md";

const AdminMenu = () => {
  return (
    <div className="wrapper-admin-menu row gx-5 me-4 p-5 m-0 shadow-sm bg-white">
      <div className="col">
        <div className="wrapperMenu p-5 bg-white rounded w-100 text-center">
          <TbMenuOrder className="fs-2" />
          <h4 className="title-menu-1 mt-2">3 Transaksi</h4>
        </div>
      </div>
      <div className="col">
        <div className="wrapperMenu p-5 bg-white rounded w-100 text-center">
          <MdMiscellaneousServices className="fs-2" />
          <h4 className="title-menu-2 mt-2">120 Daftar Jasa</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
