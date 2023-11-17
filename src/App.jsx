import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Admin from "./components/admin/admin";
import LoginAdmin from "./components/Login_Admin/Login_Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/daftar-transaksi" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
