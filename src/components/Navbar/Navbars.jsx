import "./Navbars.css";
import "./CustomToolTip.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/Pelangi_Print_Logo.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbars = () => {
  const [listCart, setListCart] = useState([]);
  const { cartJasa } = useSelector((state) => state.JasaReducer);

  useEffect(() => {
    setListCart(cartJasa);
  }, [cartJasa]);

  console.log(listCart);
  return (
    <Navbar expand="lg" className="bg-white shadow" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt="Logo Pelangi Print"
            className="nav-logo img-fluid"
          />
        </Navbar.Brand>

        <div className="row flex-grow-1 gap-4 justify-content-end">
          <div className="col-auto col-lg-auto p-0 d-flex align-items-center justify-content-end">
            <OverlayTrigger
              trigger={["click", "hover"]}
              placement="bottom"
              overlay={
                <Tooltip id="custom-tooltip">
                  {listCart.length == 0 ? (
                    <p className="m-0 text-dark fw-medium fs-5 px-2">
                      Anda belum menambahkan jasa kedalam Keranjang
                    </p>
                  ) : (
                    listCart?.map((item, index) => {
                      return (
                        <div className="row my-3" key={index}>
                          <div className="col-3 ps-2 pe-0 bg-dangers">
                            <img
                              src={item.gambar_jasa}
                              className="img-fluid "
                              style={{ width: "80%", height: "50px" }}
                            />
                          </div>
                          <div className="col-6  p-0 bg-warnings d-flex align-items-center">
                            <p className="m-0 w-100 fw-bold fs-6 text-start">
                              {item.nama_jasa}
                            </p>
                          </div>
                          <div className="col-auto p-0 bg-primarsy d-flex align-items-center">
                            <p className="m-0 w-100 fw-bold text-danger fs-6">
                              Rp {item.priceFormat.toLocaleString("id-ID")}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </Tooltip>
              }
            >
              <Nav.Link as={Link} to="/" className="position-relative text-end">
                <FiShoppingCart
                  className="fs-3 me-1 mt-1 "
                  style={{ color: "#2563eb" }}
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fw-medium">
                  {listCart.length}
                </span>
              </Nav.Link>
            </OverlayTrigger>
          </div>
          <div className="col-auto p-0">
            <div className="d-flex justify-content-end">
              <Navbar.Toggle aria-controls="navbarScroll" />
            </div>
            <Navbar.Collapse id="navbarScroll" className="bg-primaryz">
              <Nav className="ms-auto d-flex gap-3 my-2 my-lg-0">
                <Nav.Link
                  as={Link}
                  to="/about"
                  className="nav-btn-about text-decoration-none btn"
                >
                  About
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/login-admin"
                  className="nav-btn-adminlogin text-decoration-none btn"
                >
                  Admin Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navbars;
