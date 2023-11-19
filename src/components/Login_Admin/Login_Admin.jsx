import Navbars from "../Navbar/Navbars";
import "./Login_Admin.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import PrintingMachineImg from "../../assets/printing_machine.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetLogin } from "../../Redux/Action/LoginAction";

const LoginAdmin = () => {
  const { login_response } = useSelector((state) => state.LoginReducer);

  const dispatch = useDispatch();

  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(GetLogin(inputLogin.email, inputLogin.password));
  };

  useEffect(() => {
    if (login_response != "") {
      console.log(login_response);
    }
  }, [login_response]);

  return (
    <>
      <Navbars />
      <div className="container p-5 bg-white shadow rounded mt-5 ">
        <div className="row m-0 gx-5">
          <div className="col-6 d-flex justify-content-center border border-1 rounded-3">
            <img
              src={PrintingMachineImg}
              className="img-fluid"
              alt="Printing Machine Vector"
              width={300}
            />
          </div>
          <div className="col-6 ">
            <div className="row m-0 bg-dangers justify-content-center">
              <div className="col-12 p-0 bg-warnings">
                <p className="fw-bold">Masukan E-mail admin anda</p>
                <InputGroup className="email-input mb-4 w-100">
                  <Form.Control
                    placeholder="Masukan Email"
                    type="email"
                    id="email-input"
                    className="shadow-none py-2"
                    name="email"
                    value={inputLogin.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </div>
              <div className="col-12 p-0">
                <p className="fw-bold">Masukan Password admin anda</p>
                <InputGroup className="password-input w-100 mb-5">
                  <Form.Control
                    placeholder="Masukan Password"
                    className="shadow-none py-2 border-end-0"
                    id="password-input"
                    aria-describedby="password-icon"
                    type={visiblePassword ? "text" : "password"}
                    name="password"
                    value={inputLogin.password}
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text
                    id="password-icon"
                    className="bg-white"
                    onClick={() => setVisiblePassword(!visiblePassword)}
                  >
                    {visiblePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>
              </div>
              <div className="col-12 p-0">
                <button
                  // to="/admin"
                  className="btn w-100 text-white"
                  id="btn-submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
