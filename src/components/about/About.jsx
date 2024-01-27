import "./About.css";
import Navbars from "./../Navbar/Navbars";
import Footer from "./../Footer/Footer";
import Pelangi_Print_Logo from "../../assets/Banner_Pelangi_Print.png";

const About = () => {
  return (
    <div id="wrapper">
      <Navbars />
      <div className="container my-5 px-4">
        <div id="wrapper-about-img-pelangi">
          <img
            src={Pelangi_Print_Logo}
            id="about-img-pelangi"
            alt="Pelangi Mandiri Print"
            className="img-fluid w-100 mb-5"
          />
        </div>
        <h5 className="text-center text-dark fw-bold mb-4">Tentang Kami</h5>
        <p className="text-dark ttext-wrap">
          Selamat datang di Pelangi Mandiri, toko fotocopy terpercaya yang
          memberikan layanan jasa laminating, hardcover, penjualan alat tulis,
          kebutuhan sekolah, mencetak dokumen, spanduk dengan cepat dan
          berkualitas. Toko kami berlokasi di depan Kampus Gunadarma Gedung E,
          Depok, Jl. Akses Ui. Dengan peralatan yang cukup memadai dan tim
          profesional, kami siap memenuhi kebutuhan cetak dan fotokopi Anda.
          Temukan kenyamanan berbelanja di Pelangi Mandiri, tempat di mana
          setiap salinan mencerminkan kejernihan dan keindahan.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
