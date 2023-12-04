import InputSearchJasa from "../InputSearchJasa/InputSearchJasa";
import Navbars from "../Navbar/Navbars";
import "./Homepage.css";
import BannerPelangiPrint from "../../assets/Banner_Pelangi_Print.png";
import ListJasa from "../ListJasa/ListJasa";
import Footer from "../Footer/Footer";

const Homepage = () => {
  return (
    <>
      <Navbars />
      <div className="d-flex justify-content-center">
        <img src={BannerPelangiPrint} alt="Banners" className="img-fluid" />
      </div>
      {/* <InputSearchJasa /> */}
      <ListJasa />
      <Footer />
    </>
  );
};

export default Homepage;
