import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";

import LoginReducer from "../Reducer/LoginReducer";
import JasaReducer from "../Reducer/JasaReducer";

const rootReducer = combineReducers({ LoginReducer, JasaReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
