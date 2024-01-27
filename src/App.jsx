import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Admin from "./components/admin/admin";
import LoginAdmin from "./components/Login_Admin/Login_Admin";
import DetailJasa from "./components/Detail_Jasa/DetailJasa";
import TambahJasa from "./components/Admin_Sidebars/Daftar_jasa/TambahJasa_Page/TambahJasa";
import EditJasa from "./components/Admin_Sidebars/Daftar_jasa/ActionJasa/EditJasa/EditJasa";

import CardDaftarJasa from "./components/Admin_Sidebars/Daftar_jasa/CardDaftarJasa";
import TableTransaksi from "./components/Admin_Sidebars/Daftar_Transaksi/TableTransaksi";
import TableLaporanKeuangan from "./components/Admin_Sidebars/Laporan_keuangan/TableLaporanKeuangan";
import AdminDetailJasa from "./components/admin_detail_jasa/AdminDetailJasa";
import CartPage from "./components/Cart/CartPage";
import Payments from "./components/Payment/Payments";
import About from "./components/about/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail-jasa/:id" element={<DetailJasa />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/payment" element={<Payments />} />
        {/* ADMIN */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/daftar-transaksi" element={<TableTransaksi />} />
        <Route path="/admin/daftar-jasa" element={<CardDaftarJasa />} />
        <Route path="/admin/tambah-jasa" element={<TambahJasa />} />
        <Route path="/admin/detail-jasa/:id" element={<AdminDetailJasa />} />
        <Route path="/admin/edit-jasa/:id" element={<EditJasa />} />
        <Route
          path="/admin/daftar-laporan-keuangan"
          element={<TableLaporanKeuangan />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
