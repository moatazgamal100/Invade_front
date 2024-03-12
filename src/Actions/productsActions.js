// productsActions.js
import axios from "axios";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const FETCH_SINGLE_PRODUCT_REQUEST = "FETCH_SINGLE_PRODUCT_REQUEST";
export const FETCH_SINGLE_PRODUCT_SUCCESS = "FETCH_SINGLE_PRODUCT_SUCCESS";
export const FETCH_SINGLE_PRODUCT_FAILURE = "FETCH_SINGLE_PRODUCT_FAILURE";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const createProduct = (product) => {
  return (dispatch) => {
    axios
      .post("http://localhost:2000/products", product)
      .then((res) => {
        dispatch(createProductSuccess(res.data));
      })
      .catch((error) => {
        dispatch(createProductFailure(error.message));
      });
  };
};

export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: product,
});

export const createProductFailure = (error) => ({
  type: CREATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductSuccess = (product) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export const deleteProductSuccess = (productId) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: productId,
});

// New action for deleting a product
export const deleteProduct = (productId) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:2000/products/${productId}`)
      .then(() => {
        dispatch(deleteProductSuccess(productId));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };
};

export const fetchProducts = (productId) => {
  return (dispatch) => {
    dispatch(fetchProductsRequest());
    const url = productId
      ? `http://localhost:2000/products/${productId}`
      : "http://localhost:2000/products";

    axios
      .get(url)
      .then((res) => {
        dispatch(fetchProductsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error.message));
      });
  };
};

export const fetchSingleProductRequest = () => ({
  type: FETCH_SINGLE_PRODUCT_REQUEST,
});

export const fetchSingleProductSuccess = (product) => ({
  type: FETCH_SINGLE_PRODUCT_SUCCESS,
  payload: [product],
});

export const fetchSingleProductFailure = (error) => ({
  type: FETCH_SINGLE_PRODUCT_FAILURE,
  payload: error,
});

export const fetchSingleProduct = (productId) => {
  return (dispatch) => {
    dispatch(fetchSingleProductRequest());
    const url = `http://localhost:2000/products/${productId}`;

    axios
      .get(url)
      .then((res) => {
        dispatch(fetchSingleProductSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchSingleProductFailure(error.message));
      });
  };
};
