import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/Pelangi_Print_Logo.png";
import { Link } from "react-router-dom";

const Navbars = () => {
  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} alt="Logo Pelangi Print" className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto d-flex gap-3 my-2 my-lg-0"
            style={{ maxHeight: "120px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="/about"
              className="nav-btn-about text-decoration-none btn"
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/jasa"
              className="nav-btn-cekjasa text-decoration-none btn"
            >
              Cek Jasa
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
