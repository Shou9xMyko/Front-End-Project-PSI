import { useDispatch } from "react-redux";
import { HapusJasa } from "../../../../../Redux/Action/JasaAction";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

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
        dispatch(HapusJasa(dataJasa.id));
      }
    });
  };
  return (
    <button
      className="btn btn-danger fw-medium px-2 "
      onClick={handleClickDeleteJasa}
    >
      <MdDelete className="bg-primarys mb-1" /> Hapus
    </button>
  );
};

export default DeleteJasa;
