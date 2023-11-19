import "./Sidebars.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

const Sidebars = () => {
  return (
    <>
      <Sidebar
        collapsedWidth="75px"
        className="sidebar"
        style={{ height: "100vh" }}
        width="300px"
        backgroundColor="white"
      >
        <Menu className="pt-2">
          <MenuItem
            className="sub-menu fw-bold "
            component={<Link to="/admin/daftar-transaksi" />}
            icon={<RiBillLine />}
          >
            Daftar Transaksi
          </MenuItem>
          <MenuItem
            className="sub-menu fw-bold "
            component={<Link to="/admin/daftar-jasa" />}
            icon={<FaServicestack />}
          >
            Daftar Jasa
          </MenuItem>
          <MenuItem
            className="sub-menu fw-bold "
            component={<Link to="/admin/daftar-laporan-keuangan" />}
            icon={<LiaMoneyBillWaveSolid />}
          >
            Laporan Keuangan
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default Sidebars;
