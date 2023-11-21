import axios from "axios";

export const LOGIN = "Login";
export const CLEAR_LOGIN = "Clear_Login";

export const Login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const ClearLogin = () => {
  return {
    type: CLEAR_LOGIN,
    payload: "",
  };
};

export const GetLogin = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_DEV}/login-admin`,
      {
        email: email,
        password: password,
      }
    );
    dispatch(Login(response.data));
  };
};
