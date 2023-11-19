import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";

import LoginReducer from "../Reducer/LoginReducer";

const rootReducer = combineReducers({ LoginReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
