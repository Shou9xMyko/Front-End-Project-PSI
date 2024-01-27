import "./Navbars.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/Pelangi_Print_Logo.png";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cart from "./Cart/Cart";

const Navbars = () => {
  const [listCart, setListCart] = useState([]);
  const [totalKeranjang, setTotalKeranjang] = useState(0);

  const { cartJasa } = useSelector((state) => state.JasaReducer);

  useEffect(() => {
    if (listCart.length != 0) {
      let total = 0;
      listCart.map((item) => {
        total += item.priceFormat * item.qty;
      });

      setTotalKeranjang(total);
    }
  }, [listCart]);

  useEffect(() => {
    setListCart(cartJasa);
  }, [cartJasa]);

  return (
    <Navbar expand="lg" className="bg-white shadow" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            alt="Logo Pelangi Print"
            className="nav-logo img-fluid"
          />
        </Navbar.Brand>

        <div className="row flex-grow-1 gap-4 justify-content-end">
          <div className="col-auto col-lg-auto p-0 d-flex align-items-center justify-content-end">
            <Cart />
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
