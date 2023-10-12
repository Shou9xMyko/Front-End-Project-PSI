import InputSearchJasa from "../InputSearchJasa/InputSearchJasa";
import Navbars from "../Navbar/Navbar";
import "./Homepage.css";
import BannerPelangiPrint from "../../assets/Banner_Pelangi_Print.png";
import ListJasa from "../ListJasa/ListJasa";
import Footer from "../Footer/Footer";

const Homepage = () => {
  return (
    <>
      <Navbars />
      <InputSearchJasa />
      <div className="d-flex justify-content-center">
        <img src={BannerPelangiPrint} alt="Banners" />
      </div>
      <ListJasa />
      <Footer />
    </>
  );
};

export default Homepage;
