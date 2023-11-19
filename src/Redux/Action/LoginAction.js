import axios from "axios";

export const LOGIN = "TEST";

export const Login = (data) => {
  return {
    type: LOGIN,
    payload: data,
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
