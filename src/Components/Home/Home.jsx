import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container text-center ">
        <h2>Welcome to home component</h2>
        <Link to="/products" className="btn btn-primary">
          Products
        </Link>
      </div>
    </>
  );
}
