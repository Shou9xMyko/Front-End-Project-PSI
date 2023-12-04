import "./Navbars_Admin.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle, FaDoorOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClearLogin } from "../../Redux/Action/LoginAction.js";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { useState } from "react";

const NavbarsAdmin = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    localStorage.clear();

    dispatch(ClearLogin());
    navigate("/");
  };

  useEffect(() => {
    const decryptEmail = () => {
      const decryptLogin = CryptoJS.AES.decrypt(
        localStorage.getItem("login"),
        import.meta.env.VITE_SECRET_KEY
      );

      const resultDecrypt = JSON.parse(
        decryptLogin.toString(CryptoJS.enc.Utf8)
      );
      const email = resultDecrypt.email;

      if (typeof email == "undefined") {
        Swal.fire({
          icon: "success",
          title: "Terjai Kesalahan!",
          text: "Anda akan diarahkan ke halaman login",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.clear();
        navigate("/login-admin");
      } else {
        setEmail(email);
      }
    };
    decryptEmail();
  }, []);

  return (
    <Navbar expand="lg" className="" style={{ backgroundColor: "#2563eb" }}>
      <Container>
        <Navbar.Brand as={Link} to="/admin" className="text-white fw-bold">
          Admin Pelangi Print
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="me-4 mt-lg-1" id="admin-home-menu" to="/">
              Home
            </Link>
            <Navbar.Text
              className="text-white fw-medium"
              id="admin-email-as-login"
            >
              {email}
            </Navbar.Text>

            <NavDropdown
              title={<FaUserCircle className="fs-3 text-white" />}
              align="end"
            >
              <NavDropdown.Item onClick={Logout}>
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
