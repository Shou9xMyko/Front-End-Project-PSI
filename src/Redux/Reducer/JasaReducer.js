import { JASA, LOADING } from "../Action/JasaAction";

const initialState = {
  daftarJasa: [],
  isLoading: false,
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

    default:
      return state;
  }
};

export default JasaReducer;
