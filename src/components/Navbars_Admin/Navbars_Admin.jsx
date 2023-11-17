import "./Navbars_Admin.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle, FaDoorOpen } from "react-icons/fa";

const NavbarsAdmin = () => {
  return (
    <Navbar expand="lg" className="">
      <Container>
        <Navbar.Brand href="#home" className="text-white fw-bold">
          Admin Pelangi Print
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Navbar.Text className="text-white fw-bold">
              Miko Firnando
            </Navbar.Text>

            <NavDropdown
              title={<FaUserCircle className="fs-3 text-white" />}
              align="end"
            >
              <NavDropdown.Item href="#action/3.1">
                <FaDoorOpen /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarsAdmin;
