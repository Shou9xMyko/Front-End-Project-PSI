import {
  ADD_JASA_TO_CART,
  CLEAR_CART_JASA,
  JASA,
  LOADING,
} from "../Action/JasaAction";

const initialState = {
  daftarJasa: [],
  isLoading: false,
  cartJasa: [],
  isClearCart: false,
};

const JasaReducer = (state = initialState, action) => {
  switch (action.type) {
    case JASA:
      return {
        ...state,
        daftarJasa: action.payload,
      };
    case LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ADD_JASA_TO_CART:
      return {
        ...state,
        cartJasa: action.payload,
      };

    case CLEAR_CART_JASA:
      return {
        ...state,
        cartJasa: action.payload,
        isClearCart: action.status,
      };
    default:
      return state;
  }
};

export default JasaReducer;
