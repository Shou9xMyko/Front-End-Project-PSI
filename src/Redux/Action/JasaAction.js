import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";

export const JASA = "Jasa";
export const ADD_JASA = "TambahJasa";
export const LOADING = "Loading";
export const ADD_JASA_TO_CART = "AddJasaToCart";
export const CLEAR_CART_JASA = "ClearCartJasa";

export const Jasa = (data) => {
  return {
    type: JASA,
    payload: data,
  };
};

//SHOW LOADING IF ADD JASA
export const isLoading = (status) => {
  return {
    type: LOADING,
    payload: status,
  };
};

// TAMBAH JASA
export const AddJasa = (data) => {
  return async (dispatch) => {
    const dataAddJasa = new FormData();
    dataAddJasa.append("nama_jasa", data.nama_jasa);
    dataAddJasa.append("kode_jasa", data.kode_jasa);
    dataAddJasa.append("harga_jasa", data.harga_jasa);
    dataAddJasa.append("foto_jasa", data.foto_jasa);
    dataAddJasa.append("rincian_jasa", data.rincian_jasa);
    dataAddJasa.append("waktu_pengerjaan", data.waktu_pengerjaan);

    const decryptLogin = CryptoJS.AES.decrypt(
      localStorage.getItem("login"),
      import.meta.env.VITE_SECRET_KEY
    );

    const resultDecrypt = JSON.parse(decryptLogin.toString(CryptoJS.enc.Utf8));
    const token = resultDecrypt.token;

    try {
      dispatch(isLoading(true));

      const response = await axios.post(
        `${import.meta.env.VITE_API_DEV}/admin/tambah-jasa`,
        dataAddJasa,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.status_code == 200 &&
        response.data.status == "success"
      ) {
        dispatch(isLoading(false));
        Swal.fire({
          icon: "success",
          title: `${response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getJasa());
      } else if (
        response.data.status_code == 500 &&
        response.data.status == "Failed"
      ) {
        dispatch(isLoading(false));
        Swal.fire({
          icon: "error",
          title: `${response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getJasa());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error 500",
        text: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

//EDIT JASA
export const EditJasaItem = (data) => {
  console.log(data);
  return async (dispatch) => {
    if (data.foto_jasa == null || typeof data.foto_jasa == "undefined") {
      const dataEditJasa = new FormData();
      dataEditJasa.append("id", data.id);
      dataEditJasa.append("nama_jasa", data.nama_jasa);
      dataEditJasa.append("kode_jasa", data.kode_jasa);
      dataEditJasa.append("harga_jasa", data.harga_jasa);
      dataEditJasa.append("rincian_jasa", data.rincian_jasa);
      dataEditJasa.append("waktu_pengerjaan", data.waktu_pengerjaan);

      const decryptLogin = CryptoJS.AES.decrypt(
        localStorage.getItem("login"),
        import.meta.env.VITE_SECRET_KEY
      );

      const resultDecrypt = JSON.parse(
        decryptLogin.toString(CryptoJS.enc.Utf8)
      );
      const token = resultDecrypt.token;

      try {
        dispatch(isLoading(true));

        const response = await axios.patch(
          `${import.meta.env.VITE_API_DEV}/admin/edit-jasa`,
          dataEditJasa,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.data.status_code == 200 &&
          response.data.status == "success"
        ) {
          dispatch(isLoading(false));
          Swal.fire({
            icon: "success",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getJasa());
        } else if (
          response.data.status_code == 500 &&
          response.data.status == "failed"
        ) {
          dispatch(isLoading(false));
          Swal.fire({
            icon: "error",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getJasa());
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error 500",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      const dataEditJasa = new FormData();
      dataEditJasa.append("id", data.id);
      dataEditJasa.append("nama_jasa", data.nama_jasa);
      dataEditJasa.append("kode_jasa", data.kode_jasa);
      dataEditJasa.append("harga_jasa", data.harga_jasa);
      dataEditJasa.append("foto_jasa", data.foto_jasa);
      dataEditJasa.append("rincian_jasa", data.rincian_jasa);
      dataEditJasa.append("waktu_pengerjaan", data.waktu_pengerjaan);

      const decryptLogin = CryptoJS.AES.decrypt(
        localStorage.getItem("login"),
        import.meta.env.VITE_SECRET_KEY
      );

      const resultDecrypt = JSON.parse(
        decryptLogin.toString(CryptoJS.enc.Utf8)
      );
      const token = resultDecrypt.token;

      try {
        dispatch(isLoading(true));

        const response = await axios.patch(
          `${import.meta.env.VITE_API_DEV}/admin/edit-jasa`,
          dataEditJasa,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          response.data.status_code == 200 &&
          response.data.status == "success"
        ) {
          dispatch(isLoading(false));
          Swal.fire({
            icon: "success",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getJasa());
        } else if (
          response.data.status_code == 500 &&
          response.data.status == "failed"
        ) {
          dispatch(isLoading(false));
          Swal.fire({
            icon: "error",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(getJasa());
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error 500",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
};

// HAPUS JASA
export const HapusJasa = (id) => {
  return async (dispatch) => {
    const decryptLogin = CryptoJS.AES.decrypt(
      localStorage.getItem("login"),
      import.meta.env.VITE_SECRET_KEY
    );

    const resultDecrypt = JSON.parse(decryptLogin.toString(CryptoJS.enc.Utf8));
    const token = resultDecrypt.token;
    try {
      dispatch(isLoading(true));

      const response = await axios.delete(
        `${import.meta.env.VITE_API_DEV}/admin/hapus-jasa`,
        {
          params: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.data.status_code == 200 &&
        response.data.status == "success"
      ) {
        dispatch(isLoading(false));
        Swal.fire({
          icon: "success",
          title: `${response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getJasa());
      } else if (
        response.data.status_code == 500 &&
        response.data.status == "failed"
      ) {
        dispatch(isLoading(false));
        Swal.fire({
          icon: "error",
          title: `${response.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(getJasa());
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error 500",
        text: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const getJasa = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_DEV}/admin/jasa`
    );

    dispatch(Jasa(response.data.data));
  };
};

export const searchJasa = (keyword) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_DEV}/admin/jasa`
    );

    const searchDataJasa = response.data.data.filter((item) => {
      return (
        item.nama_jasa.toLowerCase().includes(keyword.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(keyword.toLowerCase())
      );
    });

    dispatch({
      type: JASA,
      payload: searchDataJasa.length == 0 ? keyword : searchDataJasa,
    });
  };
};

export const AddCart = (data) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_JASA_TO_CART,
      payload: data,
    });
  };
};

export const ClearCart = (status) => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_CART_JASA, payload: [], status: status });
  };
};
