import { useDispatch } from "react-redux";
import { HapusJasa } from "../../../../../Redux/Action/JasaAction";
import Swal from "sweetalert2";

const DeleteJasa = (dataJasa) => {
  const dispatch = useDispatch();

  const handleClickDeleteJasa = () => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      html: `<p class="">Jasa <span class="fw-semibold">${dataJasa.nama_jasa}</span> akan terhapus</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(HapusJasa(dataJasa));
      }
    });
  };
  return (
    <button
      className="btn btn-danger fw-medium py-1"
      onClick={handleClickDeleteJasa}
    >
      Hapus
    </button>
  );
};

export default DeleteJasa;
