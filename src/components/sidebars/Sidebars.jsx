import "./Sidebars.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { RiBillLine } from "react-icons/ri";
import { FaServicestack } from "react-icons/fa";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSpaceDashboard } from "react-icons/md";

const Sidebars = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="d-flex h-100">
      <Sidebar
        className="sidebar"
        backgroundColor="white"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
      >
        <Menu className="pt-2">
          <MenuItem
            className="sub-menu fw-bold "
            component={<Link to="/admin/daftar-transaksi" />}
            icon={<MdSpaceDashboard />}
          >
            Dashboard
          </MenuItem>
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
      <div>
        <button className="" id="btn-menu" onClick={() => setToggled(!toggled)}>
          <GiHamburgerMenu className="fs-4" />{" "}
          <span className="fw-bold" style={{ fontSize: "15px" }}>
            Menu
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebars;
