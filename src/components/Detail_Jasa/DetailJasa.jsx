import { useNavigate, useParams } from "react-router-dom";
import "./DetailJasa.css";
import { useSelector } from "react-redux";
import Navbars from "../Navbar/Navbars";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdCloseCircle } from "react-icons/io";
import { MdShoppingCartCheckout } from "react-icons/md";
import Footer from "../Footer/Footer";
import parse from "html-react-parser";

const DetailJasa = () => {
  const { daftarJasa } = useSelector((state) => state.JasaReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const filteringJasa = daftarJasa.filter((item) => item.id == id);

  const [value, setValue] = useState("1");
  const [acceptedFile, setAcceptedFile] = useState([]);
  const [rejectedFile, setRejectedFile] = useState([]);
  const [msgReject, setMsgReject] = useState("");
  const [linkFileUpload, setLinkFileUpload] = useState("");
  const [keterangan_pemesanan, setKeteranganPemesanan] = useState("");
  const [inAndDecrement, setInAndDecrement] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [waktuPengerjaan, setWaktuPengerjaan] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const validatorFileUpload = (file) => {
    const maxSize = 50 * 1024 * 1024;
    if (file && file.name) {
      const fileExtension = file.name.split(".")[1];

      if (file.size > maxSize) {
        setMsgReject("Gagal, File anda melebihi 50MB!");
      } else if (
        !["pdf", "jpg", "jpeg", "png", "zip", "rar"].includes(fileExtension)
      ) {
        setMsgReject(
          "File yang di perbolehkan hanya berektensi .png, .jpg, .jpeg, .pdf, .zip, .rar"
        );
      }
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: false,

    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
      "application/pdf": [".pdf", ".docx"],
      "application/zip": [".zip", ".rar"],
    },
    onDrop: (accepted, rejected) => {
      setAcceptedFile(accepted);
      setRejectedFile(rejected);
    },
    validator: validatorFileUpload,
  });

  const formatFileSize = (size) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(1024));

    return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const fileAccepted = acceptedFile.map((file) => (
    <span key={file.path} className="text-primary ps-3">
      {file.path} - {formatFileSize(file.size)}
    </span>
  ));

  const handleTotalPrice = (price) => {
    const total = price * inAndDecrement;
    setTotalPrice(total);
  };

  const handleBeli = async () => {
    const existingCartData = sessionStorage.getItem("cart");
    let cartData = [];

    if (existingCartData) {
      try {
        cartData = JSON.parse(existingCartData);

        if (!Array.isArray(cartData)) {
          cartData = [];
        }
      } catch (error) {
        console.error("Error parsing existing cart data:", error);
        cartData = [];
      }
    }

    // Cari apakah jasa dengan ID yang sama sudah ada dalam keranjang
    const existingJasaIndex = cartData.findIndex(
      (item) => item.id_jasa === filteringJasa[0].id
    );

    if (existingJasaIndex !== -1) {
      // Jika sudah ada, update jumlah_unit
      cartData[existingJasaIndex].jumlah_unit += inAndDecrement;
      cartData[existingJasaIndex].total_harga += totalPrice;
    } else {
      // Jika belum ada, tambahkan data baru
      const newJasaData = {
        id_jasa: filteringJasa[0].id,
        nama_jasa: filteringJasa[0].nama_jasa,
        kode_jasa: filteringJasa[0].kode_jasa,
        harga_jasa: filteringJasa[0].harga_jasa,
        foto_jasa: filteringJasa[0].foto_jasa,
        waktu_pengerjaan_jasa: filteringJasa[0].waktu_pengerjaan,
        file_upload_jasa: URL.createObjectURL(acceptedFile[0]),
        link_file_upload_jasa: linkFileUpload,
        keterangan_pemesanan: keterangan_pemesanan,
        jumlah_unit: inAndDecrement,
        total_harga: totalPrice,
      };

      cartData = [...cartData, newJasaData];
    }

    sessionStorage.setItem("cart", JSON.stringify(cartData));
    navigate("/cart");
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      setWaktuPengerjaan(`${minutes} Menit`);
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      if (hours < 24) {
        if (remainingMinutes === 0) {
          setWaktuPengerjaan(`${hours} Jam`);
        } else {
          setWaktuPengerjaan(`${hours} Jam ${remainingMinutes} Menit`);
        }
      } else {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;

        if (remainingMinutes === 0 && remainingHours === 0) {
          setWaktuPengerjaan(`${days} Hari`);
        } else if (remainingHours === 0) {
          setWaktuPengerjaan(`${days} Hari ${remainingMinutes} Menit`);
        } else if (remainingMinutes === 0) {
          setWaktuPengerjaan(`${days} Hari ${remainingHours} Jam`);
        } else {
          setWaktuPengerjaan(
            `${days} Hari ${remainingHours} Jam ${remainingMinutes} Menit`
          );
        }
      }
    }
  };

  useEffect(() => {
    handleTotalPrice(filteringJasa[0].harga_jasa);
    formatDuration(filteringJasa[0].waktu_pengerjaan, inAndDecrement);
  }, [inAndDecrement]);

  return (
    <>
      <Navbars />
      <div className="container-fluid p-5 bg-white mt-5">
        <div className="row bg-primarys">
          {filteringJasa?.map((item) => {
            return (
              <div className="m-0" key={item.id}>
                <div className="col-12 p-0">
                  <div className="row m-0">
                    <div className="col-12 col-xl-6 p-0">
                      <img
                        src={`data:image/png;base64,${item.foto_jasa}`}
                        className="img-fluids w-100 object-fit-cover"
                      />
                    </div>

                    <div className="col-12 col-xl-6 mt-4 px-3">
                      {/* rincian jasa */}
                      <h3 className="text-center fw-bold mb-5">
                        {item.nama_jasa}
                      </h3>
                      <div className="mb-4">{parse(item.rincian_jasa)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row bg-dangers">
          <div className="col-12 col-md-6 bg-successs" id="col-upload">
            <Box
              sx={{
                width: "100%",
                borderColor: "primary.main",
              }}
            >
              <TabContext value={value}>
                <Box>
                  <TabList onChange={handleChange} variant="fullWidth">
                    <Tab label="Upload File" value="1" />
                    <Tab label="Link" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="container-md bg-dangesr">
                    <p className="text-center">
                      <span className="text-danger">*</span> (
                      <span className="fw-bold">
                        {" "}
                        PDF, JPG, ZIP, RAR max 50MB
                      </span>
                      )
                    </p>
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />

                      {fileAccepted.length != 0 ? (
                        <div className="row m-0">
                          <div className="col-11 p-0">
                            <p className="p-0">{fileAccepted}</p>
                          </div>
                          <div className="col-1 p-0">
                            <IoMdCloseCircle
                              onClick={() => setAcceptedFile([])}
                              className="text-danger fs-4 w-100 mb-1"
                            />
                          </div>
                        </div>
                      ) : msgReject ? (
                        <p className="text-danger text-center px-2 fw-medium">
                          {msgReject}
                        </p>
                      ) : (
                        <p className="mx-3">Drag and Drop File Anda Kesini</p>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary fw-medium py-1 px-3"
                        onClick={open}
                      >
                        Cari File
                      </button>
                      <p className="text-center" id="text-upload-max-file">
                        <span className="text-danger">*</span>
                        <span className="fw-medium">
                          Jika ukuran file lebih dari 50Mb, silahkan upload file
                          di dropbox / google drive dan masukkkan link file{" "}
                          <span id="disini-link-upload">Disini</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <p className="text-dark m-0">
                    Sematkan link file pada form dibawah ini.
                  </p>
                  <input
                    type="text"
                    className="form-control w-100 shadow-none"
                    onChange={(e) => setLinkFileUpload(e.target.value)}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div className="col-12 col-md-6 bg-dangers" id="col-keterangan">
            <p className="mb-2 fw-bold">Keterangan</p>
            <div className="input-group fw-normal" id="text-area-keterangan">
              <textarea
                placeholder="Masukan keterangan terkait pesanan anda pada jasa ini"
                maxLength={300}
                value={keterangan_pemesanan}
                onChange={(e) => setKeteranganPemesanan(e.target.value)}
                className="form-control shadow-none"
              ></textarea>
            </div>
          </div>
          <div className="col-12 pt-3 p-0">
            <div className="wrapper-input-jumlah mb-5">
              <p className="text-dark mb-1 fw-bold">
                Jumlah:
                <span className="text-secondary fw-normal">
                  (Min Order: 1 Lembar)
                </span>
              </p>
              <div className="row m-0">
                <div className="col-1 p-0">
                  <button
                    className="btn btn-primary w-100 fw-bold"
                    disabled={inAndDecrement <= 1 ? true : false}
                    onClick={() =>
                      setInAndDecrement((prevVal) =>
                        prevVal > 1 ? prevVal - 1 : prevVal
                      )
                    }
                  >
                    -
                  </button>
                </div>
                <div className="col-10">
                  <input
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="form-control w-100 shadow-none text-center fw-medium bg-light"
                    onChange={(e) =>
                      e.target.value <= 1
                        ? setInAndDecrement(1)
                        : setInAndDecrement(e.target.value)
                    }
                    value={inAndDecrement}
                  />
                </div>
                <div className="col-1 p-0">
                  <button
                    className="btn btn-primary w-100 fw-bold"
                    onClick={() => setInAndDecrement((prevVal) => prevVal + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="wrapper-table-detail-jasa mb-4">
              <table className="table table-responsive table-bordered">
                <tbody>
                  <tr>
                    <td className="text-center fw-medium">Waktu Pengerjaan</td>
                    <td className="text-center">
                      {waktuPengerjaan}
                      <p className="m-0 text-danger" id="text-waktu-pengerjaan">
                        *{" "}
                        <span className="text-dark m-0">
                          Waktu pengerjaan sesuai dengan antrian
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-center">Harga Per Unit</td>
                    <td className="text-danger text-center">
                      Rp {filteringJasa[0].harga_jasa.toLocaleString("id-ID")}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-medium text-center">Jumlah</td>
                    <td className="text-center">{inAndDecrement}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold text-center">Total Harga</td>
                    <td className="text-danger fw-bold text-center">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="wrapper-btn-beli text-center mt-5">
              <button
                className="btn btn-primary fw-bold"
                id="btn-beli"
                disabled={acceptedFile.length == 0}
                onClick={handleBeli}
              >
                <MdShoppingCartCheckout className="fs-4" /> Beli
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailJasa;
