import { ADD_JASA_TO_CART, JASA, LOADING } from "../Action/JasaAction";

const initialState = {
  daftarJasa: [],
  isLoading: false,
  cartJasa: [],
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
        cartJasa: [...state.cartJasa, action.payload],
      };

    default:
      return state;
  }
};

export default JasaReducer;
