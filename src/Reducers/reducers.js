
import { combineReducers } from "redux";
import productsReducer from "./productReducers";
import cartReducer from "./cartReducers";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
