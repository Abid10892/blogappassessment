import { authReducer } from "./AuthReducer";
import { createStore } from "redux";
const store = createStore(authReducer);

export default store;
