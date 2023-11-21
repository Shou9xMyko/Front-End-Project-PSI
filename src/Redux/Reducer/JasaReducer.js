import { ADD_JASA, LOADING_ADD_JASA } from "../Action/JasaAction";

const initialState = {
  jasa: [],
  isLoadingAddJasa: false,
};

const JasaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JASA:
      return {
        ...state,
      };
    case LOADING_ADD_JASA:
      return {
        ...state,
        isLoadingAddJasa: action.payload,
      };

    default:
      return state;
  }
};

export default JasaReducer;
