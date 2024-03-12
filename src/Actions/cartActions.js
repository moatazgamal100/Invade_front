export const ADD_TO_CART = "ADD_TO_CART";
export const INCREMENT_CART_COUNT = "INCREMENT_CART_COUNT";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const incrementCartCount = () => ({
  type: INCREMENT_CART_COUNT,
});
