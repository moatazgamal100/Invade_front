// cartReducers.js
import { ADD_TO_CART, INCREMENT_CART_COUNT } from "../Actions/cartActions";

const initialState = {
  cart: [],
  cartCount: 0,
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case INCREMENT_CART_COUNT:
      return {
        ...state,
        cartCount: state.cartCount + 1,
      };
    // other cases...
    default:
      return state;
  }
};

export default cartReducers;
