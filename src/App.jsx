import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Admin from "./components/admin/admin";
import LoginAdmin from "./components/Login_Admin/Login_Admin";
import TableTransaksi from "./components/table/table_daftar_transaksi/TableTransaksi";
import CardDaftarJasa from "./components/table/Daftar_jasa/CardDaftarJasa";
import TableLaporanKeuangan from "./components/table/table_laporan_keuangan/TableLaporanKeuangan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/daftar-transaksi" element={<TableTransaksi />} />
        <Route path="/admin/daftar-jasa" element={<CardDaftarJasa />} />
        <Route
          path="/admin/daftar-laporan-keuangan"
          element={<TableLaporanKeuangan />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
