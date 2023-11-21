import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

export const ADD_JASA = "TambahJasa";
export const LOADING_ADD_JASA = "LoadingAddJasa";

export const Jasa = (data) => {};

export const isLoadingAddJasa = (status) => {
  return {
    type: LOADING_ADD_JASA,
    payload: status,
  };
};

export const AddJasa = (data) => {
  return async (dispatch) => {
    const dataAddJasa = new FormData();
    dataAddJasa.append("nama_jasa", data.nama_jasa);
    dataAddJasa.append("kode_jasa", parseInt(data.kode_jasa));
    dataAddJasa.append("harga_jasa", parseInt(data.harga_jasa));
    dataAddJasa.append("gambar_jasa", data.gambar_jasa);
    dataAddJasa.append("keterangan", data.keterangan);

    const decryptLogin = CryptoJS.AES.decrypt(
      localStorage.getItem("login"),
      import.meta.env.VITE_SECRET_KEY
    );

    const resultDecrypt = JSON.parse(decryptLogin.toString(CryptoJS.enc.Utf8));
    const token = resultDecrypt.token;

    dispatch(isLoadingAddJasa(true));

    await axios.post(
      `${import.meta.env.VITE_API_DEV}/admin/tambah-jasa`,
      dataAddJasa,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(isLoadingAddJasa(false));

    Swal.fire({
      icon: "success",
      title: "Berhasil Tambah Produk",
      showConfirmButton: false,
      timer: 1500,
    });
  };
};

export const getJasa = () => {
  return async (dispatch) => {
    // const response = await axios.post(`${import.meta.env.VITE_API_DEV}`);
  };
};
