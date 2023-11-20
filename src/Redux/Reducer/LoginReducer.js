import { CLEAR_LOGIN, LOGIN } from "../Action/LoginAction";

const initialState = {
  login_response: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login_response: action.payload,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        login_response: "",
      };

    default:
      return state;
  }
};

export default LoginReducer;
