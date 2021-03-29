import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import weatherReducer from "./reducers/weatherReducer";

let store = createStore(weatherReducer, applyMiddleware(thunk))
export default store