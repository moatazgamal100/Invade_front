// SingleProduct.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../../Actions/productsActions";
import { addToCart, incrementCartCount } from "../../Actions/cartActions";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { singleProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { id: productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  if (!singleProduct || Object.keys(singleProduct).length === 0) {
    return <div className="alert alert-warning">No product available</div>;
  }

  const product = singleProduct[0][0];
  console.log(product);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(incrementCartCount());
  };

  return (
    <div>
      <div className="row border p-3">
        <div className="col-md-6 d-flex justify-content-center align-content-center align-middle text-center">
          {product.image && (
            <img
              className="d-flex justify-content-center align-content-center"
              src={product.image}
              alt="Product Img"
              width={400}
            />
          )}
        </div>
        <div className="col-md-6 d-flex flex-column">
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            {product.rating && (
              <p>Rating: {product.rating.rate ? product.rating.rate : "N/A"}</p>
            )}
            <p>
              Price: <span className="text-success">{product.price}$</span>
            </p>
          </div>
          <div className="mt-auto">
            <button onClick={handleAddToCart} className="btn btn-success w-100">
              Add to Cart
            </button>
            <Link className="btn btn-secondary w-100 mt-2" to="/products">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
